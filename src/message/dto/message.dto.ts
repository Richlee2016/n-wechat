import { Type } from 'class-transformer';
import {
  IsString,
  IsInt,
  IsNotEmpty,
  ValidateIf,
  IsOptional,
  IsIn,
  IsArray,
  ValidateNested
} from 'class-validator'

interface NewType {
  Title: string
  Description: string
  PicUrl: string
  Url: string
}

// 验证 创建message 参数
export class ReplyDto {

  @IsNotEmpty()
  @IsIn(['text', 'image', 'voice', 'video', 'music', 'news'])
  @IsString()
  readonly MsgType: string //回复类型

  @IsOptional()
  @IsArray()
  readonly Content: Array<string | NewType> //回复内容

  @IsOptional()
  @IsString()
  readonly MediaId: string //媒体id

  @IsOptional()
  @IsString()
  readonly Title: string //标题

  @IsOptional()
  @IsString()
  readonly Description: string //描述

  @IsOptional()
  @IsString()
  readonly MusicUrl: string //音乐地址

  @IsOptional()
  @IsString()
  readonly HQMusicUrl: string //高清音乐地址

  @IsOptional()
  @IsString()
  readonly ThumbMediaId: string //高清音乐地址
}

// 创建 回复
export class CreateMessageDto {
  @IsNotEmpty()
  @IsIn(['text', 'image', 'voice', 'video', 'music', 'news'])
  @IsString()
  readonly MsgType: string //接收类型

  @IsNotEmpty()
  @IsString()
  readonly Content: string //接收内容

  @IsOptional()
  @IsString()
  readonly ToUserName: string //发送者

  @ValidateNested()
  @Type(() => ReplyDto)  //验证嵌套对象
  @IsNotEmpty()
  readonly Reply: ReplyDto
}
