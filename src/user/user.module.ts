import { Module, HttpModule } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TokenModule } from '../token/token.module';
@Module({
  imports: [TokenModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
