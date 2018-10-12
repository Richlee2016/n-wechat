import { Get, Controller } from '@nestjs/common'
import { TokenService } from './token.service'

@Controller('Token')
export class TokenController {
  constructor(private readonly Token: TokenService) {}

  @Get('FetchToken')
  async root() {
    return await this.Token.createToken()
  }
}
