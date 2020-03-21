'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TokensSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments();
      table
        .string('username', 80)
        .notNullable()
        .unique();
      table.string('password', 60).notNullable();
      table.string('name');
      table.string('family');
      table.string('mobile');
      table.string('tel');
      table.string('email');
      table.enum('gender', ['male', 'female']);
      table.date('birthday');
      table.integer('progress_level');
      table.string('next_step_label');
      table.string('next_step_url');
      table.json('personality_tests');
      table.json('videos');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = TokensSchema;
