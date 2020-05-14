'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  /**
     * 验证
     */
  async register() {

    if (await this.validateRegister()) {
      await this.ctx.service.auth.register(await this.validateRegister());
    }

  }

  async login() {
    if (await this.validateLogin()) {
      await this.ctx.service.auth.login(await this.validateLogin());
    }
  }

  async logout() {
    await this.ctx.service.auth.logout();
  }

  async logoutall() {
    await this.ctx.service.auth.logoutAllUsers();
  }

  async validateLogin() {
    const { ctx } = this;
    // 验证参数
    const validateRes = ctx.validate({
      email: {
        type: 'email',
        required: true,
        desc: '邮箱',
      },
      password: {
        type: 'string',
        required: true,
        range: {
          min: 2,
          max: 10,
        },
        desc: '密码',
      },
    });


    if (ctx.paramErrors) {
      const errmsg = ctx.paramErrors;
      ctx.apiFail(errmsg[0].err[0].replace(/\s+/g, ''), 422);
      return;
    }

    return validateRes.ret.body;
  }

  /**
     * 注册时参数验证
     */
  async validateRegister() {


    const { ctx } = this;
    // 验证参数
    const validateRes = ctx.validate({
      name: {
        type: 'string',
        required: true,
        desc: '用户名',
        range: {
          min: 2,
          max: 10,
        },
        alias: 'username',
      },
      email: {
        type: 'email',
        required: true,
        desc: '邮箱',
      },
      password: {
        type: 'string',
        required: true,
        range: {
          min: 2,
          max: 10,
        },
        desc: '密码',
      },
      repassword: {
        type: 'string',
        required: true,
        desc: '确认密码',
      },
    }, {
      equals: [[ 'password', 'repassword' ]],
    });
    if (ctx.paramErrors) {
      const errmsg = ctx.paramErrors;
      ctx.apiFail(errmsg[0].err[0].replace(/\s+/g, ''), 422);
      return;
    }

    const { email, name } = validateRes.ret.body;
    // 检查库里是否有该用户
    const isExitentName = await ctx.model.User.findOne({
      raw: true,
      where: {
        name,
      },
    });
    if (isExitentName) {
      ctx.apiFail(`用户名：${name} 已注册过，请直接登录`, 422);
      return;
    }

    const isExitentEmail = await ctx.model.User.findOne({
      raw: true,
      where: {
        email,
      },
    });
    if (isExitentEmail) {
      ctx.apiFail(`${email} 已注册过，请直接登录`, 422);
      return;
    }
    return validateRes.ret.body;
  }

}

module.exports = UserController;
