'use strict';
module.exports = (option, app) => {
  return async (ctx, next) => {
    // 1. 获取 header 头token
    const { token } = ctx.header;
    if (!token) {
      ctx.apiFail('您没有权限访问该接口!', 400);
      return;
    }
    // 2. 根据token解密，换取用户信息
    let user = {};
    try {
      user = ctx.checkToken(token);
    } catch (error) {
      const fail = error.name === 'TokenExpiredError' ? 'token 已过期! 请重新获取令牌' : 'Token 令牌不合法!';
      ctx.apiFail(fail, 400);
      return;
    }
    // 3. 判断当前用户是否登录
    const t = await ctx.service.cache.get('user_' + user.id);
    if (!t || t !== token) {
      ctx.apiFail('Token 令牌不合法!', 400);
      return;
    }
    // 4. 获取当前用户，验证当前用户是否被禁用
    user = await app.model.User.findByPk(user.id);
    if (!user || user.status === 0) {
      ctx.apiFail('用户不存在或已被禁用', 400);
      return;
    }
    // 5. 把 user 信息挂载到全局ctx上
    ctx.authUser = user;

    await next();
  };
};
