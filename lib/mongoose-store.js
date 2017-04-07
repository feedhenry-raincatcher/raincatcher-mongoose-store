'use strict';

var shortid = require('shortid');
var _ = require('lodash');
var Promise = require('bluebird');

var extractListFields = function(records) {

  if (!_.isArray(records)) {
    return records;
  }

  var list = [];
  records.forEach(function(rec) {
    list.push(rec.toObject());
  });

  return list;
};

function Store(_datasetId, _model) {
  this.model = _model;
  this.datasetId = _datasetId;
}

// do not want to create a new record on creation of a new store
Store.prototype.init = function(data) {
  if (! _.isArray(data)) {
    console.log("Initialization data is not array. Skipping");
    return Promise.resolve();
  }
  var self = this;
  var promises = [];
  _.each(data, function(entry) {
    var record = new self.model(entry);
    promises.push(record.save());
  });
  return Promise.all(promises);
};

Store.prototype.isPersistent = true;

Store.prototype.create = function(object) {
  object.id = shortid.generate();
  var record = new this.model(_.clone(object));
  return record.save();
};

Store.prototype.findById = function(id) {
  // use 'list' since 'read' can only filter by guid === mongo's ObjectId
  return this.model.findOne({id: id}).then(extractListFields);
};

Store.prototype.read = function(_id) {
  return this.model.findOne({id: _id}).then(extractListFields);
};

Store.prototype.update = function(object) {
  // delete _id to stop mongo complaining on update
  delete object._id;
  return this.model.findOneAndUpdate({
    id: object.id
  }, object, {
    upsert: true // create if doesn't exist
  }).then(extractListFields);
};

Store.prototype.delete = function(object) {
  var id = object instanceof Object ? object.id : object;

  return this.model.findOneAndRemove({id: id});
};

Store.prototype.list = function(filter) {
  var _filter = {};

  if (filter) {
    _filter[filter.key] = filter.value;
  }

  return this.model.find(_filter).then(extractListFields);
};

require('./listen')(Store);

module.exports = Store;