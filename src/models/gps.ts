import * as mongoose from 'mongoose';
import SchemaBuilder from './SchemaBuilder';
var Schema = mongoose.Schema;
import config from '../config';
var labels = config.modelLabels;
var dataset = config.datasetIDs;

var gpsSchema = new Schema({

},  {timestamps: true});

const create: SchemaBuilder = function (db: mongoose.Connection) {
  var model = db.model(labels.GPS, gpsSchema, dataset.GPS);
  return model;
};
export default create;