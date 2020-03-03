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
    let { questions, test_name } = request.post();
    let answer;
    switch (test_name) {
      case 'free':
        answer = this._free_personality_tests(questions);
        break;
      case 'gardner':
        answer = this._gardner_personality_tests(questions);
        break;
      case 'hexaco':
        answer = this._hexaco_personality_tests(questions);
        break;
      case 'chinese':
        answer = this._chinese_personality_tests(questions);
        break;
      case 'competition':
        answer = this._competition_personality_tests(questions);
        break;

      default:
        break;
    }
    try {
      let personality_tests = await user
        .toJSON()
        .personality_tests.find(item => item.test_name == test_name);

      if (!personality_tests) {
        await user.personality_tests().create(answer);
      } else {
        await User.where({ 'personality_tests.test_name': test_name }).update({
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

  _gardner_personality_tests(questions) {
    let point = _.groupBy(questions, 'type');
    for (const [key, value] of Object.entries(point)) {
      point[key] = _.sumBy(value, 'answer');
    }
    return { answer: { ...point }, questions, test_name: 'gardner' };
  }
  _hexaco_personality_tests(questions) {
    let point = _.groupBy(questions, 'type');
    for (const [key, value] of Object.entries(point)) {
      point[key] = _.sumBy(value, 'answer');
    }
    return { answer: { ...point }, questions, test_name: 'hexaco' };
  }
  _chinese_personality_tests(questions) {
    let point = _.groupBy(questions, 'type');
    for (const [key, value] of Object.entries(point)) {
      point[key] = _.sumBy(value, item => {
        let value = item.answer;
        if (item.reverse) {
          value = value == 0 ? 1 : 0;
        }
        return value;
      });
    }
    return { answer: { ...point }, questions, test_name: 'hexaco' };
  }
  _competition_personality_tests(questions) {
    let point = _.countBy(questions, 'answer');
    var sorted = _(questions)
      .countBy('answer')
      .map((count, job) => ({
        job,
        count
      }))
      .orderBy('count', 'desc')
      .value();

    return { answer: sorted, questions, test_name: 'competition' };
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
