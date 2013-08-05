var test = require('tape'),
    redis = require('redis'),
    jsonStream = require('json-stream'),
    subscribeStream = require('../');

test('do we work?', function (t) {
  t.plan(1);

  var stream = subscribeStream({ subscription: 'hithere' });

  var client = redis.createClient();

  var testObj = {
    test: 'value',
    other: 'otherValue'
  };
  var parser = jsonStream();

  parser.on('data', function (data) {
    t.deepEqual(data, testObj);
    client.end();
    stream.close();
  });

  stream.pipe(parser);


  setTimeout(function () {
    client.publish('hithere', JSON.stringify(testObj));
  }, 100);
});

