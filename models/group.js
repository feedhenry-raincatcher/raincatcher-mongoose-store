'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('./../lib/config');
var labels = config.modelLabels;
var dataset = config.datasetIDs;

var groupSchema = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  role: {
    type: String
  }
});

module.exports = function(db) {
  var model = db.model(labels.GPS, groupSchema, dataset.GPS);
  return model;
};