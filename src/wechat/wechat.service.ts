import { Injectable, Inject, HttpService } from '@nestjs/common'
import * as Rxios from 'request-promise-native'
import { WxConfig } from '../config/index.config'
@Injectable()
export class WechatService {
  private readonly Config: any = WxConfig
  async clearApi(token) {
    let opt = {
      method: 'POST',
      url: `https://api.weixin.qq.com/cgi-bin/clear_quota?access_token=${token}`,
      body: {
        appid: this.Config.Appid
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
}
