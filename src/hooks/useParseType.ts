import { ANNUAL_LIST, OVERVIEW_TYPE } from '@/utils'

export const useParseType = (type: number) => {
  return OVERVIEW_TYPE[type - 1].label
}

export const useAnnualType = (type: number) => {
  return ANNUAL_LIST[type - 1]?.fullName
}
