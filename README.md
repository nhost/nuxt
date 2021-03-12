<div align="center">
  <h1 align="center">
    @nhost/nuxt
  </h1>
  <p>Use Nhost with NuxtJS</p>
  <p>
    <img src="https://img.shields.io/npm/dt/@nhost/nuxt" />
    <img src="https://img.shields.io/npm/v/@nhost/nuxt" />
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/nhost/nuxt-nhost-module">
    <img src="https://img.shields.io/npm/l/nhost" />
    </p>
  </p>
</div>

## Installation

Using NPM:

```bash
$ npm install --save @nhost/nuxt
```

or using Yarn:

```bash
$ yarn add @nhost/nuxt
```

Add module and configure nhost in `nuxt.config.js`:

```js
{
  modules: [
    '@nhost/nuxt'
  ],
  nhost: {
    baseURL: "https://backend-REPLACE.nhost.app"
    // optional other nhost-js-sdk setup options
  }
}
```

Check out our [documentation](https://docs.nhost.io/libraries/nhost-js-sdk#setup) for all the available `nhost-js-sdk` options.

## Middleware

We provide middleware that automatically handles auth guards to protect pages.

1. Add `nhost/auth` to your Nuxt config middleware:

```js
{
  router: {
    middleware: ["nhost/auth"];
  }
}
```

2. Define the `home` and `logout` routes on the nhost config

```js
{
  nhost: {
    routes: {
      home: '/dashboard',
      logout: '/'
    }
  }
}
```

Users who attempt to access auth guarded pages without being logged in gets redirected to the `logout` route, and users who are logged in and attempt to access guest pages gets redirected to the `home` route.

These routes can also be set to either `undefined` or `false` which will disable their respective functionality. They are also available under `this.$nhost.$options.routes` on Vue components or `ctx.$nhost.$options.routes` on the Nuxt Context.

3. Finally, add an `nhostAuth` property to your Nuxt pages:

```js
export default {
  nhostAuth: true,
};
```

`nhostAuth` takes the following values:

1. `true`: Users must be authenticated to access this page. If the user is not authenticated, the user gets redirected to the `logout` route.
2. `false`: This is the default value; no authentication required.
3. `'guest'`: This page can only be accessed by unauthenticated users. Users who are logged in will be redirected to the `home` route.

## Typescript

If you're using Typescript, make sure to include `@nhost/nuxt` to your Typescript config types:

```js
{
  compilerOptions: {
    types: ["@nhost/nuxt"];
  }
}
```

## Nuxt-apollo

To use this library with nuxt-apollo, create two Nuxt plugins: `nuxt-apollo-config.js` and `nhost-apollo-ws-client.js` inside your `plugins` folder with the following content:

**nuxt-apollo-config.js**

```js
export default (ctx) => {
  return {
    httpEndpoint: "https://hasura-<REPLACE>.nhost.app/v1/graphql",
    wsEndpoint: "wss://hasura-<REPLACE>.nhost.app/v1/graphql",
    getAuth: () => {
      const token = ctx.$nhost.auth.getJWTToken();
      return token ? `Bearer ${token}` : null;
    },
  };
};
```

**nhost-apollo-ws-client.js**

```js
export default (ctx) => {
  const subscriptionClient = ctx.app.apolloProvider.defaultClient.wsClient;

  ctx.$nhost.auth.onAuthStateChanged((state) => {
    if (subscriptionClient.status === 1) {
      subscriptionClient.close();
      subscriptionClient.tryReconnect();
    }
  });

  ctx.$nhost.auth.onTokenChanged(() => {
    if (subscriptionClient.status === 1) {
      subscriptionClient.tryReconnect();
    }
  });
};
```

Then, in your Nuxt config:

```json
{
  [...]
  "plugins": [
    {
      "src": "~/plugins/nhost-apollo-ws-client.js",
      "mode": "client"
    }
  ],
  "apollo": {
    "clientConfigs": {
      "default": "~/plugins/nhost-apollo-config.js"
    }
  },
  [...]
}
```

## Usage

Exposes an `$nhost` property on the `Vue` object and on the Nuxt `Context`, which is an instance of `NhostClient`

## Example

You can find an example project with this library and `nuxt-apollo` [here](https://github.com/nhost/nhost/tree/main/examples/nuxt)
