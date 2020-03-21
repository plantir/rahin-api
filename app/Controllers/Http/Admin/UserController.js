'use strict';
const Resource = use('Resource');
class UserController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/User');
  }
  index() {
    return this.Model.query()
      .where('role', '<>', 'admin')
      .fetch();
  }

  // show({ params: { id } }) {
  //   return User.findOrFail(id);
  // }
}

module.exports = UserController;
