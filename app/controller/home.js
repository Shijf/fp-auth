'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async handler() {
    console.log(this.ctx.request.body)
    console.log("收到了");
    
    this.ctx.body = {
      reject: false,
      unchange: true
    }
  }
}

module.exports = HomeController;
