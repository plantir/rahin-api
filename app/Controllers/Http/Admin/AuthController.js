'use strict';
const User = use('App/Models/User');
class AuthController {
  async register({ request }) {
    let { username, password } = request.post();
    let is_exist = await User.findBy({ username });
    if (is_exist) {
      throw new Error('user exsit');
    }
    await User.create({
      username,
      password,
      role: 'admin',
      is_verify: false
    });
    return 'success';
  }

  async login({ request, auth }) {
    let { username, password } = request.post();
    try {
      await auth.attempt(username, password);
    } catch (error) {
      throw new Error('نام کاربری یا رمز عبور صحیح نمی باشد.');
    }
    let user = await User.findBy({ username });
    await user.load('roles');
    if (!user.$relations.roles.toJSON().some(item => item.name == 'admin')) {
      throw new Error('این ادمین هنوز تایید نشده است');
    }
    return auth.generate(user, true);
  }
}

module.exports = AuthController;
