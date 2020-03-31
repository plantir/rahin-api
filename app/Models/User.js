'use strict';

const Model = use('BaseModel');

const Bull = use('Rocketseat/Bull');

const SMS_Job = use('App/Jobs/Sms');

const Token = use('Token');
const Env = use('Env');
class User extends Model {
  static boot() {
    super.boot();
    this.addTrait('ConvertToJson');
    this.addHook('beforeCreate', 'UserHook.beforeCreate');
    this.addHook('beforeSave', 'UserHook.beforeSave');
  }
  static get hidden() {
    return ['password', 'role'];
  }
  static get jsonFields() {
    return ['personality_tests', 'videos'];
  }
  static get allowField() {
    return ['name', 'family', 'email', 'birthday', 'tel', 'gender'];
  }
  static get dates() {
    return super.dates.concat(['birthday']);
  }
  static async register(mobile) {
    let user = await this.query()
      .where({ username: mobile })
      .first();
    if (!user) {
      user = await User.create({ username: mobile, mobile, password: mobile });
    }
    await user.send_verify_code();
  }
  send_verify_code() {
    let token = Token.generate();
    this.password = token;
    this.tokens().create({
      token,
      type: 'password'
    });
    this.send_sms({ template: 'sms.verify', data: { token, is_fast: true } });
    return this.save();
  }

  async send_sms({ template, data }) {
    if (
      Env.get('NODE_ENV') === 'development' &&
      ['09356659943'].indexOf(this.mobile) == -1
    ) {
      return;
    }
    try {
      Bull.add(SMS_Job.key, {
        template,
        to: this.mobile,
        data: data || this
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }
  roles() {
    return this.belongsToMany('App/Models/Role').pivotTable('user_roles');
  }
}

module.exports = User;
