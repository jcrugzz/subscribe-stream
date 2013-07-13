/*
 * index.js :: Wrap the redis pub-sub in a readable stream like interface
 *
 * (C) 2013, Jarrett Cruger
 *
 */

var util = require('util'),
    Readable = require('stream').Readable,
    redis = require('redis');


var SubscribeStream = function (options) {
  Readable.call(this, { objectMode: true });

  if(!options || !options.subscription) {
    throw new Error('This stream requires a channel to subscribe to');
  }

  this.host = options.host || '127.0.0.1';
  this.port = options.port || '6379';
  this.password = options.password || null;
  this.subscription = options.subscription;

  this.redis = redis.createClient(this.port, this.host);

  this.redis.on('error', function (err) {
    //
    // Remark: Fuck errors for now because redis can be weird
    //
  });

  if (this.password) {
    this.redis.auth(this.password, function () {
      //
      // Remark: O hai there
      //
    });
  }

  this.redis.subscribe(this.subscription);

  this.redis.on('message', this._onPublish.bind(this));

};

util.inherits(SubscribeStream, Readable);

SubscribeStream.prototype._read = function (n) {};

SubscribeStream.prototype._onPublish = function (channel, message) {
  this.push(JSON.parse(message));
};

SubscribeStream.prototype.close = function () {
  this.redis.unsubscribe();
  this.redis.end();
  this.emit('close');
};

module.exports = function (options) {
  return new SubscribeStream(options);
}
