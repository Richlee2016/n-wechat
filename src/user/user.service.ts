import { Injectable, Inject, HttpService } from '@nestjs/common'
import * as Rxios from 'request-promise-native'
import { WxTagConfig, WxUserConfig } from '../config/index.config'
import { TokenService } from '../token/token.service'
// import { Tag, UserTag } from './interfaces/user.interface'
@Injectable()
export class UserService {
  constructor(private readonly Token: TokenService) {}
  /**
   * 标签管理
   * @param method 增删改查
   * @param tag 标签
   */
  public async handleTag(
    method: 'create' | 'get' | 'update' | 'delete',
    tag: { id?: number; name?: string; count?: number }
  ) {
    const token = await this.Token.createToken()
    let opt: any = {
      method: 'POST',
      url: WxTagConfig.createTag(token),
      json: true
    }
    switch (method) {
      case 'create':
        opt.body = { tag }
        break
      case 'get':
        opt.method = 'GET'
        opt.url = WxTagConfig.fetchTag(token)
        break
      case 'update':
        opt.url = WxTagConfig.updateTag(token)
        opt.body = { tag }
        break
      case 'delete':
        opt.url = WxTagConfig.deleteTag(token)
        opt.body = { tag }
        break
    }

    try {
      const res = await Rxios(opt)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 获取标签下粉丝列表
   * @param userTag 用户列表
   */
  public async fetchUserTag(userTag: { tagid: number; next_openid?: string }) {
    const token = await this.Token.createToken()
    let opt: any = {
      method: 'POST',
      url: WxTagConfig.fetchUserTag(token),
      body: userTag,
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
   * 批量为用户打标签/取消标签
   * @param method 1:打标签  0:取消标签
   * @param userTag
   */
  public async membersTag(
    method: 1 | 0,
    userTag: { tagid: number; openid_list?: string[] }
  ) {
    const token = await this.Token.createToken()
    let opt: any = {
      method: 'POST',
      url: WxTagConfig.batchtTag(token),
      body: userTag,
      json: true
    }
    if (!method) {
      opt.url = WxTagConfig.batchuntTag(token)
    }
    try {
      const res = await Rxios(opt)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 获取用户身上的标签列表
   * @param openid 用户 id
   */
  public async getidTag(openid: string) {
    const token = await this.Token.createToken()
    let opt: any = {
      method: 'POST',
      url: WxTagConfig.getidTag(token),
      body: { openid },
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
   * 获取用户列表
   * @param openid 用户 id
   */
  public async fetchUserList(openid: string | undefined) {
    const token = await this.Token.createToken()
    let opt: any = {
      method: 'GET',
      url: WxUserConfig.fetchUserList(token, openid)
    }
    try {
      const res = await Rxios(opt)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 设置用户备注名
   * @param mark
   */
  public async createMark(mark: { openid: string; remark: string }) {
    const token = await this.Token.createToken()
    let opt: any = {
      method: 'POST',
      url: WxUserConfig.createMark(token),
      body: mark,
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
   * 获取用户基本信息(UnionID机制)
   * @param openid 用户 id
   */
  public async fetchUnionId(openid: string) {
    const token = await this.Token.createToken()
    let opt: any = {
      method: 'GET',
      url: WxUserConfig.fetchUnionId(token, openid),
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
   * 批量获取用户基本信息
   * @param user_list
   */
  public async fetchUnionIds(
    user_list: Array<{ openid: string; lang?: string }>
  ) {
    const token = await this.Token.createToken()
    user_list.forEach(o => (o.lang = 'zh_CN'))
    let opt: any = {
      method: 'POST',
      url: WxUserConfig.fetchUnionIds(token),
      body: { user_list },
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
   * 获取公众号的黑名单列表
   * @param begin_openid 开头 openid
   */
  public async fetchBlackList(begin_openid: string | undefined) {
    const token = await this.Token.createToken()
    let opt: any = {
      method: 'POST',
      url: WxUserConfig.fetchBlackList(token),
      body: { begin_openid },
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
   * 拉黑用户
   * @param openid_list openid 列表
   */
  public async createBlack(openid_list: string[]) {
    const token = await this.Token.createToken()
    let opt: any = {
      method: 'POST',
      url: WxUserConfig.createBlack(token),
      body: { openid_list },
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
   * 取消拉黑用户
   * @param openid_list openid 列表
   */
  public async deleteBlack(openid_list: string[]) {
    const token = await this.Token.createToken()
    let opt: any = {
      method: 'POST',
      url: WxUserConfig.deleteBlack(token),
      body: { openid_list },
      json: true
    }
    try {
      const res = await Rxios(opt)
      return res
    } catch (error) {
      console.log(error)
    }
  }
}
