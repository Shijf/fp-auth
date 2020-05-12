'use strict';
const crypto = require('crypto');
const Service = require('egg').Service;

class AuthService extends Service {

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    randomString() {
        // 生成随机的16个随机数
        const len = this.getRandomIntInclusive(32, 60)
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var str = '';
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
        return await this.ctx.model.User.create({
            name,
            email,
            password,
            salt
        })
    }

    async login({ email, password }) {
        // 根据邮箱获取，查找是否存在此用户
        const user = await this.ctx.model.User.findOne({
            raw: true,
            where: {
                email
            }
        })

        if (!user) {
            this.ctx.apiFail("此邮箱没有注册过，请注册后登录", 422)
            return;
        }
        let saltPass = user.password;
        let salt = user.salt;




        password = crypto.scryptSync(password, salt, 32);
        password = password.toString('base64');

        if (saltPass !== password) {
            // todo
            // 此处可加密码验证次数
            this.ctx.apiFail("密码或者邮箱不正确，请确认后重试", 422)
            return false
        }

        // 验证成功后
        // todo 生成jwt 

        return user;


    }

    async loginById() {

    }

    async logout() {

    }

    async logoutById() {

    }

    // 生成token
    async getToken(value) {
        return this.app.jwt.sign(value, this.config.jwt.secret);
    }
}

module.exports = AuthService;
