'use strict';

module.exports = (option, app) => {
  return async function errorHandler(ctx, next) {    
    try {
      await next();
      if (ctx.status === 404 && !ctx.body) {
        ctx.body = {
          code: 404,
          msg: '404'
        };
      }
    } catch (err) {
      // 记录一条错误日志
      app.emit('error', err, ctx);
      console.log(err);
      
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      let error = status === 500 && app.config.env === 'prod' ?
        'Internal Server Error' :
        err.message;
      ctx.status = status;
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        code: 500,
        msg: error,
      };
      if (status === 422 && err.message === 'Validation Failed') {
        if (err.errors && Array.isArray(err.errors)) {
          error = err.errors[0].err[0];
        }
        // ctx.body = {
        //   code: 422,
        //   msg: error.replace(/\s+/g,""),
        // };
      }
    }
  };
};
