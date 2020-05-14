'use strict';
// eslint-disable-next-line no-unused-vars
module.exports = (option, app) => {
  return async (ctx, next) => {
    if (ctx.authUser) {
      ctx.logger.info(JSON.stringify(ctx.authUser));
    }
    await next();
  };
};

