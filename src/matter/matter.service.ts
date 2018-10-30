import { Injectable, Inject } from '@nestjs/common'
import * as Rxios from 'request-promise-native'
import { WxMatterConfig } from '../config/index.config'
import {
  FileType,
  MatterList,
  NewsType,
  MatterNews,
  CreateMaterial
} from './interfaces/matter.interface'
import contentType from 'content-type'
@Injectable()
export class MatterService {
  // 配置
  private readonly Config: any = WxMatterConfig
  /**
   * 上传素材
   * @param file 文件信息
   * @param token access_token
   * @param type 临时:false 永久:true
   */
  public async createMatter(create: CreateMaterial) {
    const { file, token, type, description } = create
    const filtType = this._getType(file.mimetype)
    let fetchUrl = type
      ? WxMatterConfig.createMaterial(token, filtType)
      : WxMatterConfig.createMedia(token, filtType)

    // 传输格式
    let media = {
      value: file.buffer,
      options: {
        filename: file.originalname,
        filelength: file.size,
        contentType: file.mimetype
      }
    }

    // 表单数据
    let opt = {
      method: 'POST',
      url: fetchUrl,
      // 是否是永久视频素材
      formData:
        filtType == 'video' && type
          ? { media, description: JSON.stringify(description) }
          : { media },
      json: true
    }
    try {
      const res = await Rxios(opt)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 创建 新闻素材
   * @param token access_token
   * @param news 新闻详情
   */
  public async createMatterNews(token: string, news: NewsType[]) {
    console.log(news);
    let opt = {
      method: 'POST',
      url: WxMatterConfig.createMaterialNews(token),
      body: { articles: news },
      json: true
    }
    console.log(opt);
    try {
      const res = await Rxios(opt)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 获取素材
   * @param token access_token
   * @param mediaId 素材id
   * @param type 临时:false 永久:true
   */
  public async fetchMatter(token: string, mediaId: string, type?: boolean) {
    let opt = {
      method: 'GET',
      url: WxMatterConfig.fetchMedia(token, mediaId),
      json: true
    }
    if (type) {
      opt = Object.assign(opt, {
        method: 'POST',
        url: WxMatterConfig.fetchMaterial(token),
        body: {
          media_id: mediaId
        }
      })
    }
    try {
      const res = await Rxios(opt)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 获取列表
   * @param token  access_token
   * @param page 页数 default 1
   * @param count 数量 default 10
   * @param type 文件类型
   */
  public async fetchMatterList(MatterList) {
    let { token, page = 0, count = 10, type } = MatterList
    let opt = {
      method: 'POST',
      url: WxMatterConfig.materiaList(token),
      body: {
        type,
        offset: page * count,
        count
      },
      json: true
    }
    try {
      let res = await Rxios(opt)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 删除永久素材
   * @param token access_token
   * @param mediaId 素材id
   */
  public async deleteMatter(token: string, mediaId: string) {
    let opt = {
      method: 'POST',
      url: WxMatterConfig.deleteMaterial(token),
      body: {
        media_id: mediaId
      },
      json: true
    }
    try {
      const res = await Rxios(opt)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 更新图文素材
   * @param token access_token
   * @param update 更新的内容
   */
  public async updateMatter(token: string, update: MatterNews) {
    console.log(update);
    let opt = {
      method: 'POST',
      url: WxMatterConfig.updateMaterial(token),
      body: update,
      json: true
    }
    try {
      const res = Rxios(opt)
      return res
    } catch (error) {
      console.log(error)
    }
  }


  /**
   * utils
   */
  private _getType(file) {
    const reg = /(.+)\/(.+)/.test(file)
    return reg ? RegExp.$1 : 'image'
  }
}
