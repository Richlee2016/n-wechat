import { Injectable, Inject, HttpService } from '@nestjs/common'
import { MessagePost } from './interfaces/message.interface'
import Cof from '../../config'
// import * as sha from 'sha1'
var sha = require('sha1')
import * as utils from './utils/utils'

class Config {
  public wx: any = Cof.WXCOF
}

@Injectable()
export class MessageService {
  private readonly Config: Config = new Config()

  public async HandleMessage(query: MessagePost, message) {
    const { signature, timestamp, nonce, echostr } = query
    const str = [this.Config.wx.Token, timestamp, nonce].sort().join('')
    const s = sha(str).toString()
    if (s !== signature) {
      return false
    } else {
      const msgRes = await utils.parmsXml(message)
      console.log(msgRes);
    }
    return 'kl'
  }
}
