import { Post, Controller, Req, Query } from '@nestjs/common'
import { MessageService } from '../message/message.service'
import * as getRawBody from 'raw-body'
import contentType from 'content-type'

@Controller('')
export class WechatController {
  constructor(private readonly Message: MessageService) {}

  @Post('wechat-hear')
  async root(@Query() query, @Req() req) {
    const message = await getRawBody(req, {
      length: req.headers['content-length'],
      limit: '1mb'
    })
    return await this.Message.HandleMessage(query, message)
  }
}
