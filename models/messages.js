var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('./../lib/config');
var labels = config.modelLabels;
var dataset = config.datasetIDs;

var messagesSchema = new Schema({
  id: {
    type: String
  },
  receiverId: {
    type: String
  },
  status: {
    type: String
  },
  sender: {
    avatar: {
      type: String
    },
    name: {
      type: String
    }
  },
  subject: {
    type: String
  },
  content: {
    type: String
  }
});

module.exports = function(db) {
  var model = db.model(labels.MESSAGES, messagesSchema, dataset.MESSAGES);
  return model;
};