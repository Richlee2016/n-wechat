import { Injectable, Inject, HttpService } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Token } from './interfaces/token.interface'
import Axios from 'axios'
import Cof from '../../config'
// wx api 配置
class Config {
  // 获取token
  public wx:any = Cof.WXCOF
  public GetTokenApi = `${this.wx.Prefix}/token?grant_type=client_credential&appid=${
    this.wx.Appid
  }&secret=${this.wx.Secret}`
}

@Injectable()
export class TokenService {
  private Config: Config = new Config()

  constructor(
    @InjectModel('t_token_table') private readonly TokenModle: Model<Token>
  ) {}

  // 请求 access_token
  public async fetchToken(): Promise<Token> {
    try {
      let getToken = await Axios.get(this.Config.GetTokenApi)
      return getToken.data
    } catch (error) {
      console.log(error)
    }
  }
  // 更新 access_token
  public async createToken(): Promise<string> {
    try {
      // 查询表中token
      let bdToken: Token = await this.TokenModle.findOne({
        name: 'access_token'
      }).exec()
      if (bdToken) {
        const { access_token, expires_in, meta } = bdToken
        let updateTime = new Date(meta.updateAt)
        // 超过时间更新
        if (Date.now() - updateTime.getTime() > (expires_in - 20) * 1000) {
          const newToken = await this.fetchToken()
          bdToken = Object.assign(bdToken, {
            access_token: newToken.access_token
          })
          let saveToken = new this.TokenModle(bdToken)
          await saveToken.save()
          return newToken.access_token
        } else {
          return access_token
        }
      } else {
        // 初始保存
        let newToken = await this.fetchToken()
        newToken.name = 'access_token'
        console.log(newToken);
        let saveToken = new this.TokenModle(newToken)
        await saveToken.save()
        return newToken.access_token
      }
    } catch (error) {
      console.log(error)
    }
  }
}
