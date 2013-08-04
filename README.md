# subscribe-stream

[![build status](https://secure.travis-ci.org/jcrugzz/subscribe-stream.png)](http://travis-ci.org/jcrugzz/subscribe-stream)

[![NPM](https://nodei.co/npm/subscribe-stream.png)](https://nodei.co/npm/subscribe-stream/)

A simple [Readable][Readable] stream that consumes the data published to
a specific `redis` [pub/sub][pubsub] channel using [`node_redis`][redis].

__note__: We assume that it is a stringified json object coming through the
pub/sub channel that then creates a stream of newline delimited objects. Use
something like [json-stream][json-stream] to turn it into an object stream.

This makes it especially useful for consuming [`godot`][godot] data sent using the `redis` reactor.

## Example

```js

var redis = require('redis'),
    jsonStream = require('json-stream'),
    subscribeStream = require('../');

var stream = subscribeStream({ subscription: 'hithere' });
var parser = jsonStream();

var client = redis.createClient();

var testObj = {
  test: 'value',
  other: 'otherValue'
};

parser.on('readable', function () {
  var obj = stream.read();
  console.log('obj', obj);
});

stream.pipe(parser);

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
[json-stream]: https://github.com/mmalecki/json-stream
