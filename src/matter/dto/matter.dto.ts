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
import { callbackify } from 'util';

// 获取和删除 素材
export class ModMatterDto {
  @IsNotEmpty()
  @IsString()
  readonly mediaId: string
  @IsOptional()
  readonly type: string | undefined
}

//获取素材列表
export class MatterListDto {
  @IsOptional()
  @IsInt()
  readonly page: number
  @IsOptional()
  @IsInt()
  readonly count: number
  @IsOptional()
  @IsIn(['text', 'image', 'voice', 'video', 'music', 'news'])
  @IsString()
  readonly type: string
}

//图文素材
export class NewType {
  @IsNotEmpty()
  @IsString()
  readonly title: string
  @IsNotEmpty()
  @IsString()
  readonly thumb_media_id: string
  @IsNotEmpty()
  @IsString()
  readonly author: string
  @IsOptional()
  @IsString()
  readonly digest: string
  @IsNotEmpty()
  @IsIn([0, 1])
  @IsInt()
  readonly show_cover_pic: number
  @IsNotEmpty()
  @IsString()
  readonly content: string
  @IsNotEmpty()
  @IsString()
  readonly content_source_url: string
}

//更新 图文素材
export class MatterNewsDto {
  @IsNotEmpty()
  @IsString()
  readonly media_id: string
  @IsNotEmpty()
  @IsInt()
  readonly index: number
  @ValidateNested()
  @Type(() => NewType) //新闻参数
  readonly articles: NewType
}

//创建图文素材
export class MatterNewsListDto {
  @ValidateNested()
  @Type(() => NewType)
  readonly articles:NewType[]
}