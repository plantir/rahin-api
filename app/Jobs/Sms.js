'use strict';
const SMS = use('SMS');
//const User = use('App/Models/User');
class Sms {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'Sms-job';
  }

  // This is where the work is done.
  async handle({ data }) {
    // let user = await User.findBy({
    //   mobile: data.to
    // });
    // if (!user.sms_enabled) {
    //   return;
    // }
    // let is_banned = await user.ban_list().fetch();
    // if (is_banned) {
    //   return;
    // }
    let is_fast = data.data.is_fast;
    delete data.data.is_fast;
    return SMS.send({
      view: data.template,
      data: data.data,
      to: data.to,
      is_fast: is_fast
    });
  }
  onCompleted(job, result) {
    console.log(job, result);
  }
}

module.exports = Sms;
