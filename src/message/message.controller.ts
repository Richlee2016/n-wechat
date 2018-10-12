import { Post, Controller, Query } from '@nestjs/common'
import { MessageService } from './message.service'
import {MessagePost} from './interfaces/message.interface'

import sha1 from 'sha1'
@Controller('')
export class MessageController {
  
  constructor() {}

  @Post('wechat-hear')
  async root(@Query() query) {
      const {signature, timestamp, nonce, echostr}:MessagePost = query;
      // const str = [token, timestamp, nonce].sort().join("");

  }
}
