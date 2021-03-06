// 微信回调 参数
export interface MessagePost {
  readonly signature: string
  readonly timestamp: string
  readonly nonce: string
  readonly echostr: string
}

// 微信消息参数
export interface MessageXml {
  MsgType: string
  CreateTime?: string
  Content?:string | Array<any>
  ToUserName?: string
  FromUserName?: string
  MediaId?: string
  Title?:string
  Description?:string
  MusicUrl?:string
  HQMusicUrl?:string
  ThumbMediaId?:string
  [props: string]: any
}

//  schemas 参数
export interface MessageSchema {
  MsgType: string
  Content:string
  ToUserName?: string
  Reply?: MessageXml
}
