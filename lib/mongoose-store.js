'use strict';

var _ = require('lodash');
var Promise = require('bluebird');

function Store(_datasetId, _model) {
  this.model = _model;
  this.datasetId = _datasetId;
}

Store.prototype.init = function(data) {
  if (!_.isArray(data)) {
    console.log("Initialization data is not array.");
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
  var record = new this.model(object);
  return record.save();
};

Store.prototype.findById = function(id) {
  // use 'list' since 'read' can only filter by guid === mongo's ObjectId
  return this.model.findOne({id: id}).select("-_id").lean().exec();
};

Store.prototype.read = function(_id) {
  return this.model.findOne({id: _id}).select("-_id").lean().exec();
};

Store.prototype.update = function(object) {
  // delete _id to stop mongo complaining on update
  delete object._id;
  return this.model.findOneAndUpdate({
    id: object.id
  }, object, {
    upsert: true // create if doesn't exist
  }).lean();
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
  return this.model.find(_filter).select("-_id").lean().exec().then(function(obj) {
    //console.log("List", obj);
    return obj;
  });
};

require('./listen')(Store);

module.exports = Store;