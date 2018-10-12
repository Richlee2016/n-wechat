import { Module, HttpModule } from '@nestjs/common'
import { MessageController } from './message.controller'
import { MessageService } from './message.service'
@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
