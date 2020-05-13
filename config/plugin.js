'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  valparams: {
    enable: true,
    package: 'egg-valparams',
  },

  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  redis: {
    enable: true,
    package: 'egg-redis',
  },
  passport: {
    enable: true,
    package: 'egg-passport',
  },

  passportLocal: {
    enable: true,
    package: 'egg-passport-local',
  },
};
