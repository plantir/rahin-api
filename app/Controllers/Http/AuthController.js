'use strict';
const User = use('App/Models/User');
class AuthController {
  async register({ request }) {
    let { mobile } = request.post();
    await User.register(mobile);
    return 'success';
  }

  async login({ request, auth }) {
    try {
      let { mobile, password } = request.post();
      await auth.attempt(mobile, password);
      let user = await User.findBy({ mobile });
      return auth.generate(user, true);
    } catch (error) {
      throw new Error('کد تایید صحیح نمی باشد.');
    }
  }
}

module.exports = AuthController;
