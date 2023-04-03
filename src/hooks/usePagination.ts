import { reactive, ref } from 'vue'
import request from '@/utils/request'

/**
 * 分页
 */
type Options = {
  method: string
}
export function usePagination<T>(api: string, options?: Options) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const list = ref<T>([])
  const loading = ref(false)
  const finished = ref(false)
  const queryState = reactive({
    ps: 10,
    pn: 1
  })

  const loadData = async () => {
    const result = await request({
      url: api,
      method: options?.method ?? 'get',
      params: queryState
    })
    list.value = list.value.concat(result.data)
    queryState.pn++
    loading.value = false
    if ((result.tc as number) <= list.value.length) {
      finished.value = true
    }
  }

  return {
    list,
    loading,
    finished,
    loadData,
    queryState
  }
}
