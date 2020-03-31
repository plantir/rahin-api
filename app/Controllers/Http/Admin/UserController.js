'use strict';
const Resource = use('Resource');
class UserController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/User');
  }
}

module.exports = UserController;
