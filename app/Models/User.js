'use strict';

/** @type {typeof import('lucid-mongo/src/LucidMongo/Model')} */
const Model = use('BaseModel');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  emails() {
    return this.referMany('App/Models/Email');
  }
}

module.exports = User;
