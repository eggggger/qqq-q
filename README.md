# qqq-q
A search string parsing and stringifying library

## Supports
* q=string
* q=string field:content
* q=string model.field:content 
* q="string" field:content 
* q="string" field:content>value

## Installation
```sh
npm install qqq-q
```

## Test 
```sh
npm test
```

## Usage
```javascript
var q = require('qqq.q');
var assert = require('assert');

var obj = q.parse('"a:xxx" b:xxx c.d:>=10');
assert.deepEqual(obj, {
  "_content": "a:xxx",
  "b": "xxx",
  "c": {
    "d": {
      "$gte": "10"
    }
  }
});

var str = qs.stringify(obj);
assert.equal(str, '"a:xxx" b:xxx c.d:>=10');
```

# License

  MIT
