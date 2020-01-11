'use strict';
const User = use('App/Models/User');
class UserController {
  async index() {
    return User.all();
  }
  async store({ request }) {
    let { username } = request.post();
    return await User.create({ username });
  }
  show({ params: { id } }) {
    return User.find(id);
  }
}

module.exports = UserController;
