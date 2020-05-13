'use strict';
const crypto = require('crypto');
const Service = require('egg').Service;

class AuthService extends Service {

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

  async register({ name, email, password }) {

    // 生成salt
    const salt = this.randomString();
    // 生成密码
    password = crypto.scryptSync(password, salt, 32);
    password = password.toString('base64');
    // 存库
    const user = await this.ctx.model.User.create({
      name,
      email,
      password,
      salt,
    });
    return await this.loginById(user.id);
  }

  async login({ email, password }) {
    const errPassRate = await this.service.cache.get(email);
    if (errPassRate > 4) {
      this.ctx.apiFail('密码错误超过5次，请五分钟后再试', 403);
      return;
    }
    // 根据邮箱获取，查找是否存在此用户
    const user = await this.ctx.model.User.findOne({
      // raw: true,
      where: {
        email,
      },
    });
    if (!user) {
      this.ctx.apiFail('密码或者邮箱不正确，请确认后重试', 422);
      return;
    }
    const saltPass = user.password;
    const salt = user.salt;

    password = crypto.scryptSync(password, salt, 32);
    password = password.toString('base64');

    if (saltPass !== password) {
      // todo
      // 此处可加密码验证次数
      // 获取用户输入错误密码错误次数
      this.ctx.apiFail('密码或者邮箱不正确，请确认后重试', 422);
      // 限制用户 一直输密码（防暴力破解）
      this.service.cache.set(email, errPassRate ? errPassRate + 1 : 1, 3);
      return;
    }
    // 验证成功后
    // todo 生成jwt
    return await this.loginById(user.id);
  }

  async loginById(id) {
    // 通过id 找到 对应的人员信息
    const user = await this.ctx.model.User.findOne({
      raw: true,
      where: {
        id,
      },
    });

    if (!user) {
      this.ctx.apiFail('用户不存在', 200);
      return;
    }
    const token = this.ctx.getToken({
      id: user.id, // 只存一个id
    });

    // 将 token 放进缓存
    if (!await this.ctx.service.cache.set('user_' + user.id, token)) {
      this.ctx.apiFail('登录失败，请重试', 500);
      return;
    }
    this.ctx.apiSuccess({
      tokenInfo: {
        expires_in: 3600,
        token,
      },
      userInfo: {
        name: user.name,
        email: user.email,
        status: user.status,
        role: user.role,
      },
    }, 200);

  }

  async logout() {
    const { ctx, service } = this;
    // 拿到当前用户id
    const userId = ctx.authUser.id;
    // 移除 redis 的对应的 用户 token
    if (await service.cache.remove('user_' + userId) === 1) {
      ctx.apiSuccess('登出成功', 200);
    } else {
      ctx.apiFail('登出失败，请重试', 500);
    }
  }

  // 下线所有用户
  async logoutAllUsers() {
    // 更改jwt的签名
    const secret = this.randomString();
    if (await this.ctx.app.redis.set('jwt_secret', secret) === 'OK') {
      this.ctx.app.jwt_secret = secret;
      console.log('===========jwt_secret密钥生成: Ok=================');
      this.ctx.apiSuccess('全员下线成功', 500);
      return;
    }
    this.ctx.apiFail('全员下线失败，请重试', 500);
    return;
  }
}

module.exports = AuthService;
