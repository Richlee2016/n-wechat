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
  public createMedia(token: string, type: string) {
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
  public createMaterial(token: string, type: string) {
    return `${
      this.prefix
    }/material/add_material?access_token=${token}&type=${type}`
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

// 标签配置
class TagConfig {
  public prefix: string
  constructor(prefix) {
    this.prefix = prefix
  }
  // 创建标签
  public createTag(token: string) {
    return `${this.prefix}/tags/create?access_token=${token}`
  }
  // 获取标签
  public fetchTag(token: string) {
    return `${this.prefix}/tags/get?access_token=${token}`
  }
  // 修改标签
  public updateTag(token: string) {
    return `${this.prefix}/tags/update?access_token=${token}`
  }
  // 删除删除
  public deleteTag(token: string) {
    return `${this.prefix}/tags/delete?access_token=${token}`
  }
  // 获取粉丝列表
  public fetchUserTag(token: string) {
    return `${this.prefix}/user/tag/get?access_token=${token}`
  }
  // 批量为用户打标签
  public batchtTag(token: string) {
    return `${this.prefix}/tags/members/batchtagging?access_token=${token}`
  }
  // 批量为用户取消标签
  public batchuntTag(token: string) {
    return `${this.prefix}/tags/members/batchuntagging?access_token=${token}`
  }
  // 获取用户身上的标签列表
  public getidTag(token: string) {
    return `${this.prefix}/tags/getidlist?access_token=${token}`
  }
}
export const WxTagConfig = new TagConfig(WxConfig.Prefix)

// 用户管理配置
class UserConfig {
  public prefix: string
  constructor(prefix) {
    this.prefix = prefix
  }
  // 获取用户列表
  public fetchUserList(token: string, openid: string | undefined) {
    let url = `${this.prefix}/user/get?access_token=${token}`
    if(openid){
      url = url + `&next_openid=${openid}`
    }
    return url
  }
  // 设置用户备注名
  public createMark(token: string) {
    return `${this.prefix}/user/info/updateremark?access_token=${token}`
  }
  // 获取用户基本信息(UnionID机制)
  public fetchUnionId(token: string, openid: string) {
    return `${
      this.prefix
    }/user/info?access_token=${token}&openid=${openid}&lang=zh_CN`
  }
  // 批量获取用户基本信息
  public fetchUnionIds(token: string) {
    return `${this.prefix}/user/info/batchget?access_token=${token}`
  }
  // 获取公众号的黑名单列表
  public fetchBlackList(token: string) {
    return `${this.prefix}/tags/members/getblacklist?access_token=${token}`
  }
  // 拉黑用户
  public createBlack(token: string) {
    return `${this.prefix}/tags/members/batchblacklist?access_token=${token}`
  }
  // 取消拉黑用户
  public deleteBlack(token: string) {
    return `${this.prefix}/tags/members/batchunblacklist?access_token=${token}`
  }
}

export const WxUserConfig = new UserConfig(WxConfig.Prefix)
