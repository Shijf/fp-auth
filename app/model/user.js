'use strict';

module.exports = app => {
  const { INTEGER, DATE, STRING, NOW, ENUM } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: {type: STRING(30), allowNull: false, comment: '用户姓名'},
      email : {type: STRING(30), allowNull: false,  comment: '用户邮箱'},
      status: {type: INTEGER(3), comment: '用户状态', defaultValue: '1'},
      password: {type: STRING(65), comment: '登录密码', allowNull: false},
      salt: {type: STRING(65), comment: '密码盐', allowNull: false},
      role: {type: ENUM({values: ['admin', 'user']}), defaultValue: 'user'},
      created_at: {type: DATE, defaultValue:NOW},
      updated_at: {type: DATE, defaultValue:NOW},
  });

  return User;
};