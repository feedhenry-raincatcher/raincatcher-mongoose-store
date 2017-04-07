var modelSchemas = require('./../models');
var connector = require('fh-mongoose-connector');
var Promise = require('bluebird');
var Store = require('./mongoose-store');
var label = require('./config').module;

var MODELS = {};

function _addCollection(name, schema, db) {
  MODELS[name] = schema(db);
}

function _handleError(error) {
  console.error(label, error.toString());
  return Promise.reject(error);
}

function _connect(uri, opts) {
  return new Promise(function(resolve) {
    connector.connectToMongo(uri, opts).then(function(db) {
      Object.keys(modelSchemas).forEach(function(key) {
        var schema = modelSchemas[key];
        _addCollection(key, schema, db);
      });
      resolve(true);
    }, _handleError);
  });
}

function _disconnect() {
  return new Promise(function(resolve) {
    connector.closeConnection().then(function() {
      resolve(true);
    }, _handleError);
  });
}

function _getDAL(dataset) {
  return new Promise(function(resolve, reject) {
    var model = MODELS[dataset];
    if (!model) {
      console.log("Invalid dataset", dataset);
      return reject(new Error("Invalid model for dataset" + dataset));
    }
    console.log("Init for dataset ", dataset);
    var mongooseDal = new Store(dataset, model);
    resolve(mongooseDal);
  });
}

module.exports = {
  getDAL: _getDAL,
  connect: _connect,
  disconnect: _disconnect
};