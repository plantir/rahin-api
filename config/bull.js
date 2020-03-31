'use strict';

const Env = use('Env');

module.exports = {
  // redis connection
  connection: Env.get('BULL_CONNECTION', 'bull'),
  bull: {
    redis: {
      host: Env.get('REDIS_HOST', 'redis'),
      port: 6379,
      password: null,
      db: 0,
      keyPrefix: 'bull'
    }
  }
};
