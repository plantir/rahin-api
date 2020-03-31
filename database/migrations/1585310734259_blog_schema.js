'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class BlogSchema extends Schema {
  up() {
    this.create('blogs', table => {
      table.increments();
      table.string('title');
      table.string('subtitle');
      table.string('cover');
      table.text('content');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('blogs');
  }
}

module.exports = BlogSchema;
