'use strict';
const User = use('App/Models/User');
class UserController {
  index() {
    return User.query()
      .where('role', '<>', 'admin')
      .fetch();
  }
}

module.exports = UserController;
