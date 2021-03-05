import Vue from 'vue';
import {createClient} from "nhost-js-sdk";

const nhostPlugin = (ctx, inject) => {
  const options = JSON.parse(`<%= JSON.stringify(options) %>`);

  inject('nhost', createClient(options));
};

export default nhostPlugin;
