import { Post, Controller, Query } from '@nestjs/common'
import { MessageService } from './message.service'

@Controller('')
export class MessageController {
  constructor(private readonly Message: MessageService) {}

  @Post('wechat-hear')
  async root(@Query() query) {
    const Message = query
    await this.Message.HandleMessage(Message)
  }
}
