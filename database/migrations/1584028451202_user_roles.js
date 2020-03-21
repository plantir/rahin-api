'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class VideosSchema extends Schema {
  up() {
    this.create('user_roles', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('user_roles');
  }
}

module.exports = VideosSchema;
