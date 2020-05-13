
'use strict';

module.exports = {
  // 成功提示
  apiSuccess(data = '', code = 'ok') {
    this.body = { code, msg: 'ok', data };
    this.status = 200;
  },
  // 失败提示
  apiFail(msg = 'fail', code = 500) {
    this.body = { code, msg };
    this.status = 500;
  },
  // 获取jwt签名token
  getToken(value) {
    return this.app.jwt.sign(value, this.app.jwt_secret, { expiresIn: '1h' });
  },
  // 验证jwt签名
  checkToken(token) {
    return this.app.jwt.verify(token, this.app.jwt_secret);
  },


};
