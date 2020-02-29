'use strict';

const Resource = use('Resource');
class UserController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/User');
  }
  async get({ auth }) {
    return auth.getUser();
  }
  async update({ request, auth }) {
    let user = await auth.getUser();
    let data = request.only(this.Model.allowFields);
    user.merge(data);
    await user.save();
    return user;
  }
}

module.exports = UserController;
