'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class VideosSchema extends Schema {
  up() {
    this.create('videos', collection => {});
  }

  down() {
    this.drop('videos');
  }
}

module.exports = VideosSchema;
