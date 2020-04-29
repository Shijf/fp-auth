
'use strict';

module.exports = {
    // 成功提示
    apiSuccess(data = '', code = 'ok') {
      this.body = { code, data };
      this.status = 200;
    },
    // 失败提示
    apiFail(data = '', code = 'fail') {
      this.body = { code, data };
      this.status = 500;
    },
  };