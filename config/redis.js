'use strict';

/*
|--------------------------------------------------------------------------
| Redis Configuaration
|--------------------------------------------------------------------------
|
| Here we define the configuration for redis server. A single application
| can make use of multiple redis connections using the redis provider.
|
*/

const Env = use('Env');

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | connection
  |--------------------------------------------------------------------------
  |
  | Redis connection to be used by default.
  |
  */
  connection: Env.get('REDIS_CONNECTION', 'local'),

  /*
  |--------------------------------------------------------------------------
  | local connection config
  |--------------------------------------------------------------------------
  |
  | Configuration for a named connection.
  |
  */
  local: {
    host: host.docker.internal,
    port: 6379,
    password: null,
    db: 0,
    keyPrefix: ''
  },
  Bull: {
    host: host.docker.internal,
    port: 6379,
    password: null,
    db: 0,
    keyPrefix: 'Bull'
  },

  /*
  |--------------------------------------------------------------------------
  | cluster config
  |--------------------------------------------------------------------------
  |
  | Below is the configuration for the redis cluster.
  |
  */
  cluster: {
    clusters: [
      {
        host: host.docker.internal,
        port: 6379,
        password: null,
        db: 0
      },
      {
        host: host.docker.internal,
        port: 6380,
        password: null,
        db: 0
      }
    ]
  }
};
