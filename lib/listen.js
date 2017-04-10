'use strict';
var Topics = require('fh-wfm-mediator/lib/topics');

module.exports = function decorate(Class) {
  Class.prototype.listen = function(topicPrefix, mediator) {
    var self = this;
    this.topics = new Topics(mediator);
    this.mediator = mediator;
    this.topics
      .prefix('wfm' + topicPrefix)
      .entity(this.datasetId)
      .on('create', function(object) {
        self.create(object).then(function(object) {
          self.mediator.publish(self.topics.getTopic('create', 'done') + ":" + object.id, object);
        }).catch(function(error) {
          console.log(error);
        });
      })
      .on('read', function(id) {
        var uid = id;
        self.read(uid).then(function(object) {
          // TODO move topics to constants
          self.mediator.publish([self.topics.getTopic('read', 'done'), uid].join(':'), object);
        }).catch(function(error) {
          console.log(error);
        });
        //TODO add error handling
      })
      .on('update', function(object) {
        var uid = object.id;
        self.update(object).then(function(object) {
          self.mediator.publish([self.topics.getTopic('update', 'done'), uid].join(':'), object.id);
        }).catch(function(error) {
          console.log(error);
        });
      })
      .on('delete', function(object) {
        var uid = object.id;
        self.delete(object).then(function(object) {
          self.mediator.publish([self.topics.getTopic('delete', 'done'), uid].join(':'), object.id);
        }).catch(function(error) {
          console.log(error);
        });
      })
      .on('list', function(filter) {
        self.list(filter).then(function(object) {
          self.mediator.publish(self.topics.getTopic('list', 'done'), object);
        }).catch(function(error) {
          console.log(error);
        });
      });

    console.log('listening for: ', this.topics.getTopic());
  };

  Class.prototype.unsubscribe = function() {
    this.topics.unsubscribeAll();
  };
};