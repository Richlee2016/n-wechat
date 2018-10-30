import { Module, HttpModule } from '@nestjs/common'
import { WechatController } from './wechat.controller'
import { WechatService } from './wechat.service'
import { MessageModule} from '../message/message.module';
import { TokenModule } from '../token/token.module';
@Module({
  imports: [MessageModule,TokenModule],
  controllers: [WechatController],
  providers: [WechatService]
})
export class WechatModule {}
