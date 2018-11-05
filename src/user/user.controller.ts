import { Get, Post, Controller, Req, Query, Body } from '@nestjs/common'
import { UserService } from './user.service'
import {
  HanTagDto,
  FetchMembersDto,
  HanMembersDto,
  MembersDto,
  UserListDto,
  UnionIdDto,
  UnionIdsDto,
  BlackDto
} from './dto/user.dto'
@Controller('User')
export class UserController {
  constructor(private readonly User: UserService) {}
  /**
   * 标签增删改查
   * @param body
   */
  @Post('Tag')
  public async handlleTag(@Body() body: HanTagDto) {
    const { method, tag } = body
    const res = await this.User.handleTag(method, tag)
    return res
  }
  /**
   * 获取标签下粉丝
   * @param query
   */
  @Post('UserTag')
  public async fetchUserTag(@Body() body: FetchMembersDto) {
    const res = await this.User.fetchUserTag(body)
    return res
  }
  /**
   * 粉丝标签管理
   * @param body
   */
  @Post('MembersTag')
  public async membersTag(@Body() body: HanMembersDto) {
    const { method, member } = body
    const res = await this.User.membersTag(method, member)
    return res
  }
  /**
   * 获取粉丝下的标签
   * @param query 
   */
  @Get('IdTag')
  public async getidTag(@Query() query: UnionIdDto){
    const { openid } = query
    const res = await this.User.getidTag(openid)
    return res
  }
  /**
   * 获取用户列表
   * @param query
   */
  @Get('UserList')
  public async fetchUserList(@Query() query: UserListDto) {
    const { next_openid } = query
    const res = await this.User.fetchUserList(next_openid)
    return res
  }
  /**
   * 获取粉丝信息
   * @param query
   */
  @Get('UnionId')
  public async fetchUnionId(@Query() query: UnionIdDto) {
    const { openid } = query
    const res = await this.User.fetchUnionId(openid)
    return res
  }
  /**
   * 批量获取信息
   * @param body
   */
  @Post('UnionIds')
  public async fetchUnionIds(@Body() body: UnionIdsDto) {
    const { user_list } = body
    const res = await this.User.fetchUnionIds(user_list)
    return res
  }
  /**
   * 获取黑名单列表
   * @param query
   */
  @Get('BlackList')
  public async fetchBlackList(@Query() query: UserListDto) {
    const { next_openid } = query
    const res = await this.User.fetchBlackList(next_openid)
    return res
  }
  /**
   * 拉入黑名单
   * @param body 
   */
  @Post('CreateBlack')
  public async createBlack(@Body() body: BlackDto) {
    const { openid_list } = body
    const res = await this.User.createBlack(openid_list)
    return res
  }
  /**
   * 删除黑名单
   * @param body 
   */
  @Post('DeleteBlack')
  public async deleteBlack(@Body() body: BlackDto) {
    const { openid_list } = body
    const res = await this.User.deleteBlack(openid_list)
    return res
  }
}
