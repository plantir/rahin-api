'use strict';

const Resource = use('Resource');
class UserController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/User');
  }
  async index() {
    return this.Model.where('emails.email', 'mail@armin.pro').paginate();
  }
  async store() {
    let user = await this.Model.create({
      name: 'armin2',
      username: 'armin.kheirkhahan2',
      password: '1234'
    });
    user.emails().create({ email: 'mail@armin.pro' });
  }
  // async store({ request }) {
  //   let { username } = request.post();
  //   return await User.create({ username });
  // }
  // show({ params: { id } }) {
  //   return User.find(id);
  // }
}

module.exports = UserController;
