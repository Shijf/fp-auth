'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

    async index() {
        const { ctx } = this;
        console.log(ctx);
        
        ctx.body = 123
    }

    async new() {

    }

    async create() {
        const { ctx } = this;
        // 验证参数
        ctx.validate({
            name: {
                type: 'string',
                required: true,
                desc: '用户名'
            },
            email: {},
            password: {},
            repassword: {}
        })
        // 生成salt

        // 存库

        // 登录
        
        ctx.body = 123
    }

    async show() {

    }

    async edit() {

    }

    async update() {

    }

    async destroy() {

    }

}

module.exports = UserController;
