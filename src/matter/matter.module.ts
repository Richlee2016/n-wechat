import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common'
import { MatterController } from './matter.controller'
import { MatterService } from './matter.service'
import { TokenModule } from '../token/token.module';
@Module({
  imports: [TokenModule],
  controllers: [MatterController],
  providers: [MatterService]
})
export class MatterModule {}
