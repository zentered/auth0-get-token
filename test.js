const test = require('tap').test
const token = require('./index')

test('request token with environment variables', async assert => {
  const actual = await token('test@heneise.io', 'HelloTest1')

  assert.ok(actual.accessToken)
  assert.ok(actual.idToken)
  assert.end()
})

test('request token with config', async assert => {
  const actual = await token('test@heneise.io', 'HelloTest1', {
    url: process.env.AUTH0_BASE_URL,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    audience: process.env.AUTH0_AUDIENCE,
    realm: process.env.AUTH0_REALM
  })

  assert.ok(actual.accessToken)
  assert.end()
})
