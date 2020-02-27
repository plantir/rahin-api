'use strict';
const User = use('App/Models/User');
class AuthController {
  async register({ request }) {
    let { mobile } = request.post();
    await User.register(mobile);
    return 'success';
  }

  async login({ request, auth }) {
    let { mobile, password } = request.post();
    let jwt_token = await auth.attempt(mobile, password);
    return jwt_token;
  }
}

module.exports = AuthController;
