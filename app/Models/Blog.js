'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class Blog extends Model {
  static get allowField() {
    return ['title', 'subtitle', 'cover', 'content'];
  }
}

module.exports = Blog;
