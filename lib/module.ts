import path from 'path';
import { Module } from '@nuxt/types';
import type { createClient, UserConfig } from 'nhost-js-sdk';

declare module 'vue/types/vue' {
  interface Vue {
    $nhost: ReturnType<typeof createClient>
  }
}

type Options = UserConfig;

const nhostModule: Module<Options> = function(options) {
  this.addPlugin({
    src: path.resolve(__dirname, '../templates/plugin.js'),
    ssr: false,
    options: {
      ...options,
      ...this.options.nhost,
    }
  });
};

export const meta = require('../package.json');

export default nhostModule;
