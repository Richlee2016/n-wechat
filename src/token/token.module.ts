import { Module, HttpModule } from '@nestjs/common'
import { TokenController } from './token.controller'
import { TokenService } from './token.service'
import { MongooseModule } from '@nestjs/mongoose'
import { TokenSchema } from './schemas/token.schema'
@Module({
  imports: [HttpModule,MongooseModule.forFeature([{ name: 't_token_table', schema: TokenSchema }])],
  controllers: [TokenController],
  providers: [TokenService]
})
export class TokenModule {}
