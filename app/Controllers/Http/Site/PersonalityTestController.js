'use strict';
/** @type {import('lodash')} */
const _ = use('lodash');
const User = use('App/Models/User');
const PersonalityTest = use('App/Models/PersonalityTest');
class PersonalityTestController {
  async answer({ request, auth }) {
    let user;
    try {
      user = await auth.getUser();
    } catch (error) {
      user = await User.create();
    }
    let { questions, type } = request.post();
    let answer;
    switch (type) {
      case 'free':
        answer = this._free_personality_tests(questions);
        break;

      default:
        break;
    }
    try {
      let personality_tests = await user
        .personality_tests()
        .query()
        .where({ name: type })
        .first();

      if (!personality_tests) {
        await user.personality_tests().create(answer);
      } else {
        await User.where({ 'personality_tests.test_name': type }).update({
          $set: { 'personality_tests.$': answer }
        });
      }
    } catch (error) {
      console.log(error);
    }
    return { ...answer, user };
  }

  _free_personality_tests(questions) {
    let point = _.sumBy(questions, 'answer');
    let type;
    if (point < 36) {
      type = 4;
    } else if (point < 56) {
      type = 3;
    } else if (point < 78) {
      type = 2;
    } else {
      type = 1;
    }
    return { answer: { type: type }, questions, test_name: 'free' };
  }

  async get() {
    // .where({ personality_tests: 1 })
    // .fetch();
    // return User.where({ 'personality_tests.name': 'free' }).fetch();
    User.where({ 'personality_tests.test_name': 'free' }).update({
      $set: { 'personality_tests.$': { name: 'armin' } }
    });
    return 'success';
  }
}

module.exports = PersonalityTestController;
