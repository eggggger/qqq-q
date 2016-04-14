import test from 'ava'
import q from '../'

test('parses a search string', t => {
  t.deepEqual(q.parse('a:1'), { a: 1 })
  t.deepEqual(q.parse('"1"'), { _content: '1' })
  t.deepEqual(q.parse('"t"'), { _content: 't' })
  t.deepEqual(q.parse('"t" a:1'), { _content: 't', a: 1 })
  t.deepEqual(q.parse('"t" a:1 b:2'), { _content: 't', a: 1, b: '2' })
  t.deepEqual(q.parse('"t" a.b:1'), { _content: 't', a: { b: 1 } })
  t.deepEqual(q.parse('"t" a.b.c:2'), { _content: 't', a: { b: { c: 2 } } })
  t.deepEqual(q.parse('"t" a.b:1 a.c:2'), { _content: 't', a: { b: 1, c: 2 } })
})

test('parses a search string with conditions', t => {
  t.deepEqual(q.parse('"t" a:>1'), { _content: 't', a: { $gt: 1 }})
  t.deepEqual(q.parse('"t" a:>=1'), { _content: 't', a: { $gte: 1 }})
  t.deepEqual(q.parse('"t" a:<1'), { _content: 't', a: { $lt: 1 }})
  t.deepEqual(q.parse('"t" a:<=1'), { _content: 't', a: { $lte: 1 }})
  t.deepEqual(q.parse('"t" a:!=1'), { _content: 't', a: { $not: 1 }})
  t.deepEqual(q.parse('"t" a:>1 a:<2'), { _content: 't', a: { $gt: 1, $lt: 2 }})
})
