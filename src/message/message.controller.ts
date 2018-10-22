import { Post, Controller, Body } from '@nestjs/common'
import { MessageService } from './message.service'
import { CreateMessageDto } from './dto/message.dto'
@Controller('Message')
export class MessageController {
  constructor(private readonly Message: MessageService) {}

  @Post('CreateReply')
  async createReply(@Body() createReplyDto: CreateMessageDto) {
    console.log(createReplyDto);
    // for (const key in createReplyDto) {
    //     const el = createReplyDto[key];
    //     if(key !==){};
    // }
    // await this.Message.CreateReply(createReplyDto)
  }
}
