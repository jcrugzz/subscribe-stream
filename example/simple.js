var redis = require('redis'),
    subscribeStream = require('../');

var stream = subscribeStream({ subscription: 'hithere' });

var client = redis.createClient();

var testObj = {
  test: 'value',
  other: 'otherValue'
};

stream.on('readable', function () {
  var obj = stream.read();
  console.log('obj', obj);
});

client.publish('hithere', JSON.stringify(testObj));

