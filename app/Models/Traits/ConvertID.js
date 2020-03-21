'use strict';

class ConvertId {
  register(Model) {
    Model.addHook('afterFind', item => {
      item.id = item._id;
      delete item._id;
      return item;
    });
    Model.addHook('afterFetch', items => {
      for (let item of items) {
        item.id = item._id;
        delete item._id;
      }
      return items;
    });
  }
}

module.exports = ConvertId;
