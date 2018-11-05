import { Type } from 'class-transformer'
import {
  IsString,
  IsInt,
  IsNotEmpty,
  ValidateIf,
  IsOptional,
  IsIn,
  IsArray,
  ValidateNested,
  ArrayContains
} from 'class-validator'

//标签
class TagDto {
  @IsString()
  @IsOptional()
  readonly name?: string
  @IsOptional()
  @IsInt()
  readonly id?: number
  @IsOptional()
  @IsInt()
  readonly count?: number
}
// 处理标签
export class HanTagDto {
  @IsNotEmpty()
  @IsIn(['create', 'get', 'update', 'delete'])
  readonly method: 'create' | 'get' | 'update' | 'delete'
  @IsOptional()
  @ValidateNested()
  @Type(() => TagDto)
  readonly tag?: TagDto
}
//获取标签下粉丝
export class FetchMembersDto {
  @IsNotEmpty()
  @IsInt()
  readonly tagid: number
  @IsOptional()
  @IsString()
  readonly next_openid?: string
}
// 打标签
export class MembersDto {
  @IsNotEmpty()
  @IsInt()
  readonly tagid: number
  @IsOptional()
  @IsArray()
  readonly openid_list: string[]
}
// 处理 打标签
export class HanMembersDto {
  @IsNotEmpty()
  @IsIn([0, 1])
  readonly method: 1 | 0 //打标签 取消标签
  @IsOptional()
  @ValidateNested()
  @Type(() => MembersDto)
  readonly member?: MembersDto //数据
}
// 用户列表 以及 黑名单
export class UserListDto {
  @IsOptional()
  @IsString()
  readonly next_openid: string  //开头openid
}
// 用户详细信息 Openid
export class UnionIdDto {
  @IsNotEmpty()
  @IsString()
  readonly openid: string
}
// 用户详细信息
export class UnionIdsDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => UnionIdDto)
  readonly user_list: UnionIdDto[]
}

// 黑名单
export class BlackDto {
  @IsNotEmpty()
  @IsArray()
  readonly openid_list: string[]
}

