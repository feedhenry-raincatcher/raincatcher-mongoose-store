'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('./../lib/config');
var labels = config.modelLabels;
var dataset = config.datasetIDs;

var fileSchema = new Schema({
  id: String,
  uid: String,
  name: {
    type: String
  },
  namespace: {
    type: String
  },
  retries: {
    type: Number,
    default: 3
  }
});

module.exports = function(db) {
  var model = db.model(labels.FILE, fileSchema, dataset.FILE);
  return model;
};