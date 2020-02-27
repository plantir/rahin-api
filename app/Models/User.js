'use strict';

/** @type {typeof import('lucid-mongo/src/LucidMongo/Model')} */
const Model = use('BaseModel');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

const Bull = use('Rocketseat/Bull');

const SMS_Job = use('App/Jobs/Sms');

const Token = use('Token');
const Env = use('Env');
class User extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }
  static get hidden() {
    return ['password'];
  }
  static get allowFields() {
    return ['name', 'family', 'email', 'birthday', 'tel', 'gender'];
  }
  static async register(mobile) {
    let user = await this.query()
      .where({ mobile })
      .first();
    if (!user) {
      user = await User.create({ mobile });
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
    this.send_sms({ template: 'sms.verify', data: { token } });
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

  emails() {
    return this.referMany('App/Models/Email');
  }
}

module.exports = User;
