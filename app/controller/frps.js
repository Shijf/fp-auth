'use strict';

const Controller = require('egg').Controller;

class FrpsController extends Controller {
  async handler() {
    const { ctx } = this;
    console.log('====================================');
    console.log(ctx.request.body);
    console.log('====================================');
    const { op, content } = ctx.request.body;
    let res;
    switch (op) {
      case 'Login' :
        res = await ctx.service.frps.Login(content);
        break;
      case 'NewProxy':
        res = await ctx.service.frps.NewProxy(content);
        break;
      case 'Ping':
        res = await ctx.service.frps.Ping(content);
        break;
      case 'NewWorkConn':
        res = await ctx.service.frps.NewWorkConn(content);
        break;
      case 'NewUserConn':
        res = await ctx.service.frps.NewUserConn(content);
        break;
      default:
        break;
    }

    console.log('===========res===================');
    console.log(res);
    console.log('===========res======================');

    this.ctx.body = {
      reject: false,
      unchange: true,
    };
  }
}

module.exports = FrpsController;
