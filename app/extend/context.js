
'use strict';

module.exports = {
    // 成功提示
    apiSuccess(data = '', code = 'ok') {
      this.body = { code, msg: "ok", data };
      this.status = 200;
    },
    // 失败提示
    apiFail(msg = "fail", code = 500, ) {
      this.body = { code, msg };
      this.status = 500;
    },
  };