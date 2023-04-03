import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './router-config'
// import { useDocumentTitle } from '@/hooks/useDocumentTitle'
// import emitter from '@/utils/bus'
// import { getDetaios } from '@/utils'
const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: constantRoutes
})

// router.beforeEach(async (to, from, next) => {
// const token = localStorage.getItem('token') || null
// const user = await getDetaios(localStorage.getItem('user') || null)
// console.log(!token, user)
// if (!token || user) {
//   if (to.path == '/my') {
//     if (!token) {
//       next('/login')
//       useDocumentTitle(to.meta.title as string)
//     } else {
//       emitter.emit('why', { flag: true })
//       next(false)
//     }
//   } else {
//     next()
//     useDocumentTitle(to.meta.title as string)
//   }
// } else {
//   next()
//   useDocumentTitle(to.meta.title as string)
// }
// })

export default router
