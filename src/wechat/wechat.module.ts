import { Module, HttpModule } from '@nestjs/common'
import { WechatController } from './wechat.controller'
import { WechatService } from './wechat.service'
import { MessageModule} from '../message/message.module';
@Module({
  imports: [MessageModule],
  controllers: [WechatController],
  providers: [WechatService]
})
export class WechatModule {}
