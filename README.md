# subscribe-stream

A simple [Readable][Readable] object stream that consumes the data published to
a specific `redis` [pub/sub][pubsub] channel using [`node_redis`][redis].

__note__: We assume that it is a stringified json object coming through the
pub/sub channel that is again parsed into an object because they are much nicer
to deal with.

## Example

```js

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

```

## Test

`npm test`

## License

MIT

[Readable]: http://nodejs.org/api/stream.html#stream_class_stream_readable
[redis]: https://github.com/mranney/node_redis
[pubsub]: https://github.com/mranney/node_redis#publish--subscribe
