import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TokenModule } from './token/token.module'
import { MessageModule } from './message/message.module'
import { WechatModule } from './wechat/wechat.module';
@Module({
  imports: [
    WechatModule,
    TokenModule,
    MessageModule,
    MongooseModule.forRoot('mongodb://localhost:27017/wechat')
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
