# nhost-nuxt-module

Nuxt.js wrapper for [nhost-js-sdk](https://github.com/nhost/nhost-js-sdk).

## Installation

First install the package:

```
npm install --save nhost-nuxt-module
```

or using Yarn:

```
yarn add nhost-nuxt-module
```

Then, add it to your Nuxt config `modules`.

```
{
  ...
  modules: [
    ...
    'nhost-nuxt-module'
  ]
}
```

You can configure it like so:

```
{
  ...
  modules: [
    ...
    'nhost-nuxt-module'
  ],
  nhost: {
    baseURL: "https://backend-url.nhost.app"
    // Your options go here
  }
}
```

To check out all the available options, check our [documentation](https://docs.nhost.io/libraries/nhost-js-sdk#setup).

## Typescript

If you're using Typescript, make sure to include `nhost-nuxt-module` to your Typescript config types:

```
{
  ...
  compilerOptions: {
    ...
    types: [
      ...
      "nhost-nuxt-module"
    ]
  }
}
```

## Usage

Exposes an `$nhost` property on the `Vue` object which is an instance of `NHostClient`
