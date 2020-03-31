'use strict';
const Resource = use('Resource');
class BlogController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/Blog');
  }
}

module.exports = BlogController;
