import {createClient} from "nhost-js-sdk";
import cookieUniversal from 'cookie-universal';
import Middleware from './middleware'
import {authMiddleware} from '~nhost/auth-middleware';

Middleware['nhost/auth'] = authMiddleware;

export default function nhostPlugin(ctx, inject) {
  let options = JSON.parse(`<%= JSON.stringify(options) %>`);

  const cookies = cookieUniversal(ctx.req, ctx.res)

  options = {
    ... options,
    clientStorageType: 'custom',
    clientStorage: {
      setItem(key, value) {
        cookies.set(key, value);
      },
      getItem(key) {
        return cookies.get(key);
      },
      removeItem(key) {
        cookies.remove(key);
      }
    },
    ssr: false
  }

  const client = createClient(options);

  client.$options = options;

  inject('nhost', client);

  return client.auth.isAuthenticatedAsync().then();
};
