import test from 'ava'
import q from '../'

test('stringifies a search object', t => {
  t.is(q.stringify({ a: 1 }), 'a:1')
  t.is(q.stringify({ _content: 1}), '"1"')
  t.is(q.stringify({ _content: 't' }), '"t"')
  t.is(q.stringify({ _content: 't', a: 1 }), '"t" a:1')
  t.is(q.stringify({ _content: 't', a: 1, b: '2' }), '"t" a:1 b:2')
  t.is(q.stringify({ _content: 't', a: { b: 1 } }), '"t" a.b:1')
  t.is(q.stringify({ _content: 't', a: { b: { c: 2 } } }), '"t" a.b.c:2')
  t.is(q.stringify({ _content: 't', a: { b: 1, c: 2 } }), '"t" a.b:1 a.c:2')
})

test('stringifies a search object with conditions', t => {
  t.is(q.stringify({ _content: 't', a: { $gt: 1 }}), '"t" a:>1')
  t.is(q.stringify({ _content: 't', a: { $gte: 1 }}), '"t" a:>=1')
  t.is(q.stringify({ _content: 't', a: { $lt: 1 }}), '"t" a:<1')
  t.is(q.stringify({ _content: 't', a: { $lte: 1 }}), '"t" a:<=1')
  t.is(q.stringify({ _content: 't', a: { $not: 1 }}), '"t" a:!=1')
  t.is(q.stringify({ _content: 't', a: { $gt: 1, $lt: 2 }}), '"t" a:>1 a:<2')
})
