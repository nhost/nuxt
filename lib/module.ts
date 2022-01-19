//  var { createClient, UserConfig } = require('../../nhost-js');

import path from 'path';
import { Module } from '@nuxt/types';
import type { createClient, NhostClientConstructorParams } from '@nhost/nhost-js';
import { resolve } from 'path'

declare module 'vue/types/vue' {
  interface Vue {
    $nhost: ReturnType<typeof createClient>
    nhostAuth: boolean | 'guest';
  }
}

declare module '@nuxt/types' {
  interface Context {
    $nhost: ReturnType<typeof createClient> & {
      $options: {
        routes: {
          home: string | false | undefined;
          login: string | false | undefined;
          logout: string | false | undefined;
        }
      }
    }
  }
}

type Options = NhostClientConstructorParams;

const nhostModule: Module<Options> = function (options) {
  this.addPlugin({
    src: path.resolve(__dirname, '../templates/plugin.js'),
    options: {
      ...options,
      ...this.options.nhost,
    }
  });

  this.options.alias['~nhost/auth-middleware'] = resolve(__dirname, 'authMiddleware');
  if (this.options.build.transpile)
    this.options.build.transpile.push(__dirname);
};

export const meta = require('../package.json');

export default nhostModule;
