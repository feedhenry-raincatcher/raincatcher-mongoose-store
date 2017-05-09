'use strict';

import * as mongoose from 'mongoose';
import SchemaBuilder from './SchemaBuilder';
var Schema = mongoose.Schema;
import config from '../config';
var labels = config.modelLabels;
var dataset = config.datasetIDs;

var fileSchema = new Schema({
  id: String,
  uid: String,
  owner: String,
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
},  {timestamps: true});

const create: SchemaBuilder = function (db: mongoose.Connection) {
  var model = db.model(labels.FILE, fileSchema, dataset.FILE);
  return model;
};
export default create;