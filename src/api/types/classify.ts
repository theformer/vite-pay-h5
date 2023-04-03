export interface IArticleClassify {
  id: number // id
  title: string // 综述提名
  createTime: string // 创建事件
  type: number // 综述类型
  annual: number
  organizer1: string
  organizer2: string
  organizer3: string
  content: string
}

export interface IReportClassify {
  id: number // id
  title: string
  createTime: string // 创建时间
  reporterName: string
  reporterCover: string
  detailsLink: string
  annual: number
}

export interface IExpertClassify {
  id: number // id
  // 姓名
  name: string
  guests: string // 职务
  createTime: string // 创建时间
  imgUrl: string // 专家图片
}
export type listProps = IArticleClassify | IExpertClassify | IReportClassify

export type listKeyProps = {
  hot: listProps[]
  annual23: listProps[]
  annual24: listProps[]
  [key: string]: listProps[]
}
export type IClassifyList = {
  [key in keyof listKeyProps]: listProps[]
}

export interface IExpertDetail {
  annual: number
  countries: string
  guests: string
  id: number
  imgUrl: string
  introduce: string
  name: string
  reporterList: IReportClassify[]
}

export interface IFileCount {
  articleTotal: number // 综述文件
  guestsTotal: number // 专家总数
  reporterTotal: number // 报告总数
  [key: string]: number
}
