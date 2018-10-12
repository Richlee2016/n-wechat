// 微信post 参数
export interface MessagePost {
  readonly signature: string
  readonly timestamp: string
  readonly nonce : string
  readonly echostr: string
}
