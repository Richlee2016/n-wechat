import { Module, HttpModule } from '@nestjs/common'
import { MessageController } from './message.controller'
import { MessageService } from './message.service'
import { MongooseModule } from '@nestjs/mongoose'
import { MessageSchema } from './schemas/message.schema'
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 't_reply_table', schema: MessageSchema }
    ])
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule {}
