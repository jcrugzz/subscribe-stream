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
    t.deepEqual(obj, testObj);
    client.end();
    stream.close();
  });

  setTimeout(function () {
    client.publish('hithere', JSON.stringify(testObj));
  }, 100);
});

