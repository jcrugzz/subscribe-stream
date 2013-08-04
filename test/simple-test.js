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

  parser.on('readable', function () {
    var obj = parser.read()
    t.deepEqual(obj, testObj);
    client.end();
    stream.close();
  });

  stream.pipe(parser);


  setTimeout(function () {
    client.publish('hithere', JSON.stringify(testObj));
  }, 100);
});

