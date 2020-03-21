'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class VideosSchema extends Schema {
  up() {
    this.create('roles', table => {
      table.increments();
      table
        .string('name', 254)
        .notNullable()
        .unique();
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('roles');
  }
}

module.exports = VideosSchema;
