import { onBeforeRouteLeave, useRouter } from 'vue-router'

// 这里把targetPages参数设置为数组，因为目标页面可能有多个，比如B -> C, B -> D
export function useKeepPage(targetPages: string[]) {
  const router = useRouter()

  /**
   * @description: 更新路由meta.keepAlive值
   * @return {*}
   * @param name
   * @param val
   */
  const updateRouterKeepAlive = (name: string, val: boolean) => {
    router.options.routes.map((item: any) => {
      if (item.name === name) {
        item.meta.keepAlive = val
      }
    })
  }

  /**
   * @description: 设置页面缓存
   * @return {*}
   * @param toName
   * @param formName
   */
  const setKeepPage = (toName: string, formName: string) => {
    // 判断是否进入目标页面
    if (!targetPages.includes(toName)) {
      updateRouterKeepAlive(formName, false)
    } else {
      updateRouterKeepAlive(formName, true)
    }
  }

  // 设置路由钩子
  onBeforeRouteLeave((to, from) => {
    setKeepPage(to.name as string, from.name as string)
  })

  return {
    setKeepPage,
    updateRouterKeepAlive
  }
}
