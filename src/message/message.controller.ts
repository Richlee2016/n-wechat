import { Post, Controller, Body } from '@nestjs/common'
import { MessageService } from './message.service'
import { CreateMessageDto } from './dto/message.dto'
@Controller('Message')
export class MessageController {
  constructor(private readonly Message: MessageService) {}
  /**
   * 创建回复
   * @param createReplyDto 
   */
  @Post('CreateReply')
  async createReply(@Body() createReplyDto: CreateMessageDto) {
    await this.Message.CreateReply(createReplyDto)
  }
}
