import {
  Post,
  Get,
  Controller,
  Body,
  Request,
  Query,
  UseInterceptors,
  FileInterceptor,
  UploadedFile
} from '@nestjs/common'
import { MatterService } from './matter.service'
import { TokenService } from '../token/token.service'
import { ModMatterDto, MatterListDto, MatterNewsDto,MatterNewsListDto } from './dto/matter.dto'
@Controller('Matter')
export class MatterController {
  constructor(
    private readonly Matter: MatterService,
    private readonly Token: TokenService
  ) {}
  //添加 素材
  @Post('matter')
  @UseInterceptors(FileInterceptor('file'))
  async createMatter(@UploadedFile() file, @Body() body) {
    const {type,title = "",introduction = ""} = body 
    const token = await this.Token.createToken()
    const res = await this.Matter.createMatter({
      file,
      token:token,
      type:!!body.type,
      description:{
        title,
        introduction
      }
    })
    return res
  }
  // 添加图文素材
  @Post('matterNews')
  async createMatterNews(@Body() body:MatterNewsListDto) {
    const token = await this.Token.createToken()
    const res = await this.Matter.createMatterNews(token, body.articles)
    return res
  }
  //获取素材
  @Get('matter')
  async fetchMatter(@Query() query: ModMatterDto) {
    let { mediaId, type } = query
    let isMedia = !!type
    const token = await this.Token.createToken()
    const res = await this.Matter.fetchMatter(
      token,
      mediaId,
      isMedia
    )
    return res
  }

  //删除永久素材
  @Post('delleteMatter')
  async deleteMatter(@Body() body: ModMatterDto) {
    let { mediaId, type } = body
    const token = await this.Token.createToken()
    const res = await this.Matter.deleteMatter(token, mediaId)
    return res
  }
  
  //修改图文素材
  @Post('updateMatter')
  async updateMaterial(@Body() body: MatterNewsDto) {
    const token = await this.Token.createToken()
    const res = await this.Matter.updateMatter(token, body)
    return res
  }
  //获取素材列表
  @Get('getMatterList')
  async getMatterList(@Query() query: MatterListDto) {
    let { page, count, type } = query
    const token = await this.Token.createToken()
    const res = await this.Matter.fetchMatterList({
      token: token,
      page,
      count,
      type
    })
    return res
  }
}
