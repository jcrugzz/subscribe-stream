var test = require('tape'),
    redis = require('redis'),
    subscribeStream = require('../');

test('do we work?', function (t) {
  t.plan(1);

  var stream = subscribeStream({ subscription: 'hithere' });

  var client = redis.createClient();

  var testObj = {
    test: 'value',
    other: 'otherValue'
  };

  stream.on('readable', function () {
    var obj = stream.read();
    client.end();
    stream.close();
    t.deepEqual(obj, testObj);
  });

  client.publish('hithere', JSON.stringify(testObj));
});

