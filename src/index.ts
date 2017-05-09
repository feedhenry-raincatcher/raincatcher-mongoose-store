import modelSchemas, { SchemaMap, SchemaBuilder } from './models';
import DB from './DB'
import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';

// replace mongoose's promise implementation with Bluebird
import * as Bluebird from 'bluebird';
require('mongoose').Promise = Bluebird;
declare module 'mongoose' {
  type Promise<T> = Bluebird<T>;
}

import Store from './mongoose-store';
import config from './config';
const label = config.module;

var MODELS: { [index: string]: mongoose.Model<mongoose.Document> } = {};

const connector = new DB();

function _addCollection(name: string, schema: SchemaBuilder, db: mongoose.Connection) {
  MODELS[name] = schema(db);
}

/**
 *
 * Function to connect to mongoose and set up models based on schemas.
 *
 * Users have the option to set their own custom schemas if required.
 *
 * @param mongoUrl - A valid mongodb connection URL
 * @param options - Any custom connection parameters for the mongoose connection
 * @param [customSchemas] - Optional Custom schemas passed by the application.
 * @returns {bluebird|exports|module.exports}
 */
export function connect(mongoUrl: string, options: mongoose.ConnectionOptions, customSchemas: SchemaMap) {
  //The default dataset schemas to use will be the ones passed by the user
  const schemasToUse = _.defaults(customSchemas, modelSchemas);

  return connector.connectToMongo(mongoUrl, options)
    .then(db => _.each(schemasToUse,
      (schema, key) => _addCollection(key, schema, db)))
}

export function disconnect() {
  return connector.closeConnection();
}

export function getDAL(dataset: string) {
  var model = MODELS[dataset];
  if (!model) {
    return Promise.reject(new Error("Invalid model for dataset " + dataset));
  }
  var mongooseDal = new Store(dataset, model);
  return Promise.resolve(mongooseDal);
}
