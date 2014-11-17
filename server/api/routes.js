'use strict';

var controller = require('./controller.js');

module.exports = function (app) {
  app.route('/:page').get(controller.getPhotos);
};

