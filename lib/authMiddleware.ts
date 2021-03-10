import { Middleware } from "@nuxt/types";
import { Route, routeOption } from "./routeOption";

export const authMiddleware: Middleware = async ctx => {
  const isAuthenticated = await ctx.$nhost.auth.isAuthenticatedAsync();

  if(routeOption((ctx.route as unknown) as Route, 'nhostAuth', 'guest')) {
    if(isAuthenticated && ctx.$nhost.$options.routes.home) {
      ctx.redirect(ctx.$nhost.$options.routes.home)
    }
  }

  if(routeOption((ctx.route as unknown) as Route, 'nhostAuth', true)) {
    if(!isAuthenticated && ctx.$nhost.$options.routes.logout) {
      ctx.redirect(ctx.$nhost.$options.routes.logout)
    }
  }
}