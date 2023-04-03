export interface IAnnual {
  id: number
  label: string
}

/**
 * 届份
 */
export const ANNUAL_LIST = [
  // { id: 1, label: '23届' },
  { id: 1, label: '第24届', fullName: '第二十四届中国科协年会' }
]

/**
 * 综述类型
 */
export const OVERVIEW_TYPE = [
  { id: 1, label: '论坛会议综述' },
  { id: 2, label: '研讨会会议综述' }
]

export const COMPANY_LIST = [
  { label: '中国科协-机关部门', id: 5 },
  { label: '中国科协-直属单位', id: 6 },
  { label: '政府机关', id: 7 },
  { label: '省科协', id: 8 },
  { label: '省级科协', id: 9 },
  { label: '市科协', id: 10 },
  { label: '市级科协', id: 11 },
  { label: '国家级学会', id: 12 },
  { label: '省级学会', id: 13 },
  { label: '科研机构', id: 14 },
  { label: '高校', id: 15 },
  { label: '医院', id: 16 },
  { label: '投融资机构', id: 17 },
  { label: '企业', id: 18 },
  { label: '其他', id: 19 }
]

export const BASICS_LIST = {
  name: 'JSON中国',
  url: 'http://www.json.org.cn',
  page: 88,
  isNonProfit: true,
  address: {
    street: '浙大路38号.',
    city: '浙江杭州',
    country: '中国'
  },
  links: [
    {
      name: 'Google',
      url: 'http://www.google.com'
    },
    {
      name: 'Baidu',
      url: 'http://www.baidu.com'
    },
    {
      name: 'SoSo',
      url: 'http://www.SoSo.com'
    }
  ]
}
