'use strict';

const Resource = use('Resource');
class UserController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/User');
  }
  async get({ auth }) {
    let user = await auth.getUser();
    user = user.forClient();
    return user;
  }
  async update({ request, auth }) {
    let user = await auth.getUser();
    let data = request.only(this.Model.allowFields);
    user.merge(data);
    await user.save();
    return user.forClient();
  }
  async seeVideo({ request, auth }) {
    let user = await auth.getUser();
    let { level, field_name, video_name } = request.post();

    let fields = user[`video_${level}`].fields;
    let field_index = fields.findIndex(item => item.name == field_name);
    let videos = fields[field_index].videos;
    videos = videos.map(item => {
      if (item.name == video_name) {
        item.is_seen = true;
      }
      return item;
    });
    await user.save();
    user = user.forClient();
    return user;
  }

  async getTestAnswer({ params: { name }, auth }) {
    let user = await auth.getUser();
    return user.toJSON().personality_tests.find(item => item.test_name == name)
      .answer;
  }
}

module.exports = UserController;
