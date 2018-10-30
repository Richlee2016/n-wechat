import { Get, Post, Controller, Req, Query, Body } from '@nestjs/common'
import { MessageService } from '../message/message.service'
import { WechatService } from './wechat.service'
import { TokenService } from '../token/token.service';
import * as getRawBody from 'raw-body'
import contentType from 'content-type'
@Controller('')
export class WechatController {

  constructor(
    private readonly Message: MessageService,
    private readonly Wechat: WechatService,
    private readonly Token: TokenService
  ) {}

  @Post('wechat-hear')
  async root(@Query() query, @Req() req) {
    const message = await getRawBody(req, {
      length: req.headers['content-length'],
      limit: '1mb'
    })
    return await this.Message.HandleMessage(query, message)
  }
  @Get('clear-wechat')
  async clearApi() {
    const token =await this.Token.createToken()
    const res = await this.Wechat.clearApi(token)
    return res
  }
}
