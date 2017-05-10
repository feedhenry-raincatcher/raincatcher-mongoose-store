import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;
import SchemaBuilder from './SchemaBuilder';
import config from '../config';
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
},  {timestamps: true});

const create: SchemaBuilder = function (db: mongoose.Connection) {
  var model = db.model(labels.MESSAGES, messagesSchema, dataset.MESSAGES);
  return model;
};
export default create;