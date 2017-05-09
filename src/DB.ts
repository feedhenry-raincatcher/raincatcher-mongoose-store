'use strict';

import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
const label = '[fh-mongoose] ';

const handlers = {
  onError: function(err: Error) {
    console.error(label, err.toString());
  },
  onConnection: function(uri: string) {
    console.info(label, 'Connected to Mongo @', uri);
  },
  onConnectionOpen: function() {
    console.info(label, 'Mongo connection open');
  },
  onClose: function() {
    console.info(label, 'Mongo connection closed');
  }
};

export default class DB {
  connection: mongoose.Connection;
  connectToMongo = function(this: DB, uri: string, opts: mongoose.ConnectionOptions = {}) {
    return new Promise<mongoose.Connection>((resolve, reject) => {
      mongoose.connect(uri, opts);
      const conn = mongoose.connection;
      conn.once('open', () => {
        this.connection = conn;
        handlers.onConnectionOpen();
      }).on('error', function(error: Error) {
        handlers.onError(error);
        reject(error);
      }).on('connected', function() {
        handlers.onConnection(uri);
        resolve(conn);
      });
    });
  };

  getConfig = function(this: DB) {
    var self = this;
    return Promise.resolve(self.connection.config);
  }
  closeConnection = function() {
    var self = this;
    return new Promise(function(resolve) {
      self.connection.close(handlers.onClose);
      resolve(true);
    });
  }
};
