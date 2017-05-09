'use strict';

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;
import SchemaBuilder from './SchemaBuilder';
import config from '../config';
var labels = config.modelLabels;
var dataset = config.datasetIDs;

var membershipSchema = new Schema({
  id: {
    type: String
  },
  group: {
    type: String
  },
  user: {
    type: String
  }
},  {timestamps: true});

const create: SchemaBuilder = function (db: mongoose.Connection) {
  var model = db.model(labels.MEMBERSHIP, membershipSchema, dataset.MEMBERSHIP);
  return model;
};
export default create;