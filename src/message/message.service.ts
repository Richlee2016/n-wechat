import { Injectable, Inject, HttpService } from '@nestjs/common'
import { MessagePost } from './interfaces/message.interface'
import Cof from '../../config'
import sha from 'sha1'

class Config {
  public wx: any = Cof.WXCOF
}

@Injectable()
export class MessageService {
  private readonly Config: Config = new Config()

  public async HandleMessage(Message: MessagePost) {
    const { signature, timestamp, nonce, echostr } = Message
    const str = [this.Config.wx.Token, timestamp, nonce].sort().join("");
    const s = sha(str).toString();
    return 'kl'
  }
}
