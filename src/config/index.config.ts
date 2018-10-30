// 微信基础配置
export const WxConfig: any = {
  Prefix: 'https://api.weixin.qq.com/cgi-bin',
  Appid: 'wxa74fa379e56fc98a',
  Secret: '51e021265600de8df53077641d27e5ad',
  Token: 'Rich19Lee90Love04you03'
}

// 素材管理配置
class MatterConfig {
  public prefix: string
  constructor(prefix) {
    this.prefix = prefix
  }
  public createMedia(token: string,type: string) {
    return `${this.prefix}/media/upload?access_token=${token}&type=${type}`
  }
  public fetchMedia(token: string, mediaId: string) {
    return `${this.prefix}/media/get?access_token=${token}&media_id=${mediaId}`
  }
  // 新增 新闻 永久素材
  public createMaterialNews(token: string) {
    return `${this.prefix}/material/add_news?access_token=${token}`
  }
  // 上传图文消息内的图片获取 url
  public createMaterialNewsImg(token: string) {
    return `${this.prefix}/media/uploadimg?access_token=${token}`
  }
  // 新增其他 永久素材
  public createMaterial(token: string, type:string) {
    return `${this.prefix}/material/add_material?access_token=${token}&type=${type}`
  }
  public fetchMaterial(token: string) {
    return `${this.prefix}/material/get_material?access_token=${token}`
  }
  public deleteMaterial(token: string) {
    return `${this.prefix}/material/del_material?access_token=${token}`
  }
  public updateMaterial(token: string) {
    return `${this.prefix}/material/update_news?access_token=${token}`
  }
  public materialCount(token: string) {
    return `${this.prefix}/material/get_materialcount?access_token=${token}`
  }
  public materiaList(token: string) {
    return `${this.prefix}/material/batchget_material?access_token=${token}`
  }
}

export const WxMatterConfig = new MatterConfig(WxConfig.Prefix)
