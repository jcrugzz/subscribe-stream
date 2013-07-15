# subscribe-stream

[![build status](https://secure.travis-ci.org/jcrugzz/subscribe-stream.png)](http://travis-ci.org/jcrugzz/subscribe-stream)

A simple [Readable][Readable] object stream that consumes the data published to
a specific `redis` [pub/sub][pubsub] channel using [`node_redis`][redis].

__note__: We assume that it is a stringified json object coming through the
pub/sub channel that is again parsed into an object because they are much nicer
to deal with. This can be seen in the example below.

This makes it especially useful for consuming [`godot`][godot] data sent using the `redis` reactor.

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

Which outputs:

`obj { test: 'value', other: 'otherValue' }`

## Test

`npm test`

## License

MIT

[godot]: https://github.com/nodejitsu/godot
[Readable]: http://nodejs.org/api/stream.html#stream_class_stream_readable
[redis]: https://github.com/mranney/node_redis
[pubsub]: https://github.com/mranney/node_redis#publish--subscribe
