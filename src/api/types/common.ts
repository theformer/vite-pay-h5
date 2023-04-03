/**
 * 会议列表：
 */
export interface IMeeting {
  id: number
  createTime: string
  meetingName: string
  meetingStart: string
  meetingEnd: string
  imgUrl: string
  imgUrlPc: string
}
/**
 * 热门报告：
 */
export interface IReporter {
  id: number
  reporterName: string
  meetingName: string
  reporterCover: string
  meetingEnd: string
  imgUrl: string
}
/**
 * 热门榜单：
 */
export interface IGuests {
  id: number
  imgUrl: string
  name: string
  guests: string
}
/**
 * 首页banner图：
 */
export interface IBanner {
  url: string
  id: number
}
/**
 * 只接受Number类型：
 */
export interface INumber {
  activeName: number
}

export interface ICommonPage {
  pn: number
  ps: number
}
