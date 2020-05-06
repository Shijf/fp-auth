'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {


    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
      }

    randomString() {
        const len = this.getRandomIntInclusive(32, 60)
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var str = '';
        for (let i = 0; i < len; i++) {
            str += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    }

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
                desc: '用户名',
                alias: 'username'
            },
            email: {
                type: 'email',
                required: true,
                desc: '邮箱'
            },
            password: {
                type: 'string',
                required: true,
                desc: '密码'
            },
            repassword: {
                type: 'string',
                required: true,
                desc: '确认密码'
            }
        }, {
            equals: [['password', 'repassword']]
        })
        // 生成salt
        // 生成随机的16个随机数
        const salt = this.randomString()
        console.log(salt);
        
        // 存库

        // 登录

        return ctx.body = 123
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
