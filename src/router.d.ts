import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    showTab?: boolean
    keepAlive?: boolean
    userDia?: boolean
  }
}
