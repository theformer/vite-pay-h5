export interface IHistoryOverview {
  imgUrl: string
  meetingName: string
  meetingStart: string
  createTime: string
  refId: number
  type: number // 综述类型
}

export interface IHistoryExpert {
  imgUrl: string
  guests: string
  guestsName: string
  refId: number
  createTime: string
}
export interface IHistoryReport {
  imgUrl: string
  reporterName: string
  refId: number
  createTime: string
  title: string
  detailsLink: string
}

export interface IUserInfo {
  age: number
  company: string
  companyType: number // 单位类型
  userId: number
  userName: string
  mobile: string
}

export interface IUpdateUserInfo {
  age: number
  company: string
  companyType: number // 单位类型
  userName: string
}
export interface IAdvice {
  title: string
  question: string
}
