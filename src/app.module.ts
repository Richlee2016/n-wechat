import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TokenModule } from './token/token.module'
import { MessageModule } from './message/message.module'
@Module({
  imports: [
    TokenModule,
    MessageModule,
    MongooseModule.forRoot('mongodb://localhost:27017/wechat')
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
