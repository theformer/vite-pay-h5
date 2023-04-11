export interface MovieObjProps {
  title: string
  url: string
  poster: string
}

export interface UserInfo {
  node_type: string
  hash: string
  up_node_hash: string
}
export interface ConfigNode {
  hash: string
}
export interface QueryVideo {
  hash: string
  count: number
  row: number
}
export interface ComplaintVideo {
  hash: string
  offset: number
  limit: number
}
export interface ComplaintCreate {
  hash: string
  title: string
  body: string
  environment: string
}
export interface VideoBasic {
  announcement: string
  searchClassify: object
}
