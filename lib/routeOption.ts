// https://github.com/nuxt-community/auth-module/blob/37b1156e59c14f82fd01e076e9b56f63c1cc755a/src/types/router.ts
export interface VueComponent {
  options: any
  _Ctor: VueComponent
}

export type MatchedRoute = { components: VueComponent[] }

export type Route = { matched: MatchedRoute[] }

// https://github.com/nuxt-community/auth-module/blob/37b1156e59c14f82fd01e076e9b56f63c1cc755a/src/utils/index.ts#L43
export function routeOption(
  route: Route,
  key: string,
  value: any
): boolean {
  return route.matched.some((m) => {
    if (process.client) {
      // Client
      return Object.values(m.components).some(
        (component) => component.options && component.options[key] === value
      )
    } else {
      // SSR
      return Object.values(m.components).some((component) =>
        Object.values(component._Ctor).some(
          (ctor) => ctor.options && ctor.options[key] === value
        )
      )
    }
  })
}