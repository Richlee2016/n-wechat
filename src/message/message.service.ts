import { Injectable, Inject, HttpService } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import {
  MessagePost,
  MessageXml,
  MessageSchema
} from './interfaces/message.interface'
import * as xml2js from 'xml2js'
var sha = require('sha1')
// 配置文件
import * as Config from '../config/index.config'
import { ReplyDto } from './dto/message.dto'

@Injectable()
export class MessageService {
  // 配置
  private readonly WxConfig: any = Config.WxConfig

  constructor(
    @InjectModel('t_reply_table')
    private readonly ReplyModle: Model<MessageSchema>
  ) {}

  /**
   * 获取信息并处理返回
   */
  public async HandleMessage(query: MessagePost, message): Promise<string> {
    const { signature, timestamp, nonce, echostr } = query
    const str = [this.WxConfig.Token, timestamp, nonce].sort().join('')
    const s = sha(str).toString()
    if (s !== signature) {
      return ''
    } else {
      const msgRes: any = await this._parmsXml(message)
      const msgJson = this._formatMessage(msgRes.xml)
      const reply = await this._replay(msgJson)
      console.log(reply)
      return reply
    }
  }
  /**
   * 回复
   */
  /**
   * 创建回复
   */
  public async CreateReply(Reply: MessageSchema) {
    try {
      const _reply = new this.ReplyModle(Reply)
      await _reply.save()
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 修改回复
   */
  public async UpdateReply() {}
  /**
   * 删除回复
   */
  public async DeleteReply() {}

  /************************************************************私有处理方法 */
  /**
   * 解析 xml
   */
  private _parmsXml(xml: string): Promise<{}> {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, { trim: true }, (err, content) => {
        if (err) {
          reject(err)
        } else {
          resolve(content)
        }
      })
    })
  }

  /**
   * 解析数据为 json
   */
  private _formatMessage(xml: MessageXml) {
    let message: MessageXml = {}
    if (typeof xml === 'object') {
      for (const key in xml) {
        const el = xml[key]
        if (el.length === 1) {
          if (Object.prototype.toString.call(el[0]) === '[objcet Object]') {
            message[key] = this._formatMessage(el[0])
          }
          message[key] = el[0]
        } else {
          message[key] = []
          for (let j = 0; j < el.length; j++) {
            message[key].push(this._formatMessage(el[j]))
          }
        }
      }
    }
    return message
  }

  /**
   * 公共回复策略
   */
  private _repcommom(message: MessageXml, reply: string): string {
    const { ToUserName, FromUserName, MsgType } = message
    const CreateTime = new Date().getTime()
    return `<xml>
    <ToUserName><![CDATA[${ToUserName}]]></ToUserName>
    <FromUserName><![CDATA[${FromUserName}]]></FromUserName>
    <CreateTime>${CreateTime}</CreateTime>
    <MsgType><![CDATA[${MsgType}]]></MsgType>
    ${reply}
    </xml>
    `
  }
  /**
   *
   * DB 消息回复
   */
  private async _replay(message: MessageXml): Promise<string> {
    let replyMsg: MessageSchema | undefined
    const { MsgType, ToUserName, FromUserName, Content, MediaId } = message
    
    replyMsg = await this.ReplyModle.findOne({ MsgType:MsgType, Content:Content }).exec()
    if (!replyMsg) {
      return ''
    }

    // 特定用户 回复(暂留)
    if(replyMsg.ToUserName == FromUserName ){}


    const reply: MessageXml = Object.assign(replyMsg, {
      ToUserName: FromUserName,
      FromUserName: ToUserName
    })
    const replyText: string = this._tep('text')(reply.Reply)
    return this._repcommom(reply, replyText)
  }
  /**
   * 回复模板
   */
  private _tep(type: string) {
    return (Reply: MessageXml): string => {
      if (type === 'text') {
        return `<Content><![CDATA[${Reply.Content}]]></Content>`
      } else if (type === 'image') {
        return `<Image>
                  <MediaId><![CDATA[${Reply.MediaId}]]></MediaId>
                </Image>`
      } else if (type === 'voice') {
        return `<Voice>
                  <MediaId><![CDATA[${Reply.MediaId}]]></MediaId>
                </Voice>`
      } else if (type === 'video') {
        return `<Video>
                  <MediaId><![CDATA[${Reply.MediaId}]]></MediaId>
                  <Title><![CDATA[${Reply.Title}]]></Title>
                  <Description><![CDATA[${Reply.Description}]]></Description>
                </Video>
                `
      } else if (type === 'music') {
        return `<Music>
                  <Title><![CDATA[${Reply.Title}]]></Title>
                  <Description><![CDATA[${Reply.Description}]]></Description>
                  <MusicUrl><![CDATA[${Reply.MusicUrl}]]></MusicUrl>
                  <HQMusicUrl><![CDATA[${Reply.HQMusicUrl}]]></HQMusicUrl>
                  <ThumbMediaId><![CDATA[${Reply.ThumbMediaId}]]></ThumbMediaId>
                </Music>`
      } else if (type === 'news') {
        const items: string[] = Reply.Content.map(item => {
          return `<item>
                    <Title><![CDATA[${item.Title}]]></Title>
                    <Description><![CDATA[${item.Description}]]></Description>
                    <PicUrl><![CDATA[${item.PicUrl}]]></PicUrl>
                    <Url><![CDATA[${item.Url}]]></Url>
                  </item>`
        })
        return `<ArticleCount>${Reply.Content.length}</ArticleCount>
                <Articles>
                  ${items.join('')}
                </Articles>`
      }
    }
  }
}
