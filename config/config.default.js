/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588070284144_1806';

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'auth' ];
  config.auth = {
    ignore: [ '/login', '/register' ],
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      match: [ ], // 过滤frps RPC接口
    },
  };


  config.valparams = {
    locale: 'zh-cn',
    throwError: false,
  };

  config.jwt = {
    secret: 'qhdgw@45nchkhjkashdaksh2!#@3nxjdas*_672',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'fp_auth',
    password: 'root',
  };

  // redis存储
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 2,
    },
  };

  // config.passportLocal  = {

  // };

  return {
    ...config,
    ...userConfig,
  };
};
