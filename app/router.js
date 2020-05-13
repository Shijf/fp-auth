'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/handler', controller.frps.handler);
  router.post('/login', controller.user.login);
  router.post('/logout', controller.user.logout);
  router.post('/logoutall', controller.user.logoutall);
  router.post('/register', controller.user.register);
};
