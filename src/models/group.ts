'use strict';

import * as mongoose from 'mongoose';
import SchemaBuilder from './SchemaBuilder';
var Schema = mongoose.Schema;
import config from '../config';
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
},  {timestamps: true});

const create: SchemaBuilder = function (db: mongoose.Connection) {
  var model = db.model(labels.GROUP, groupSchema, dataset.GROUP);
  return model;
};
export default create;