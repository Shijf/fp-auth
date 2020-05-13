'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
  }
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
  }

  randomString() {
    // 生成随机的16个随机数
    const len = this.getRandomIntInclusive(32, 60);
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
  }

  async serverDidReady() {
    // Server is listening.
    // 生成 jwt 加密密钥
    const secret = this.randomString();
    if (await this.app.redis.set('jwt_secret', secret) === 'OK') {
      this.app.jwt_secret = secret;
      console.log('===========jwt_secret密钥生成: Ok=================');
    } else {
      this.app.jwt_secret = this.app.config.jwt.secret;
      console.log('===========jwt_secret密钥生成: fail, 延用配置文件的secret =================');
    }
  }
}

module.exports = AppBootHook;
