var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('./../lib/config');
var labels = config.modelLabels;
var dataset = config.datasetIDs;

var workorderSchema = new Schema({
  id: {type: String },
  workflowId: {type: String },
  assignee: {type: String },
  type: {type: String },
  title: {type: String },
  status: {type: String },
  startTimestamp: {type: Date },
  finishTimestamp: {type: Date },
  address: {type: String },
  location: [Number],
  summary: {type: String }
},{ timestamps: false, strict: false, versionKey: false });

workorderSchema.index({
  id: 1
});

module.exports = function(db) {
  return db.model(labels.WORKORDERS, workorderSchema, dataset.WORKORDERS);
};