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
    audience: process.env.AUTH0_AUDIENCE
  })

  assert.ok(actual.accessToken)
  assert.end()
})

test('fail if "Password" is not set as grant on the applicion', async assert => {
  try {
    await token('test@heneise.io', 'HelloTest1', {
      clientId: process.env.MISSING_GRANT_CLIENT_ID,
      clientSecret: process.env.MISSING_GRANT_CLIENT_SECRET,
      url: process.env.AUTH0_BASE_URL,
      audience: process.env.AUTH0_AUDIENCE
    })
    assert.fail('should not get here')
  } catch (err) {
    assert.equal(err.message, 'unauthorized_client')
  }
  assert.end()
})

test('fail with missing config', async assert => {
  try {
    await token('user', 'pass', {})
    assert.fail('should not get here')
  } catch (err) {
    assert.equal(err.message, 'missing config. Please check base url, client id and client secret are valid')
  }
  assert.end()
})

test('fail with missing username or password', async assert => {
  try {
    await token()
    assert.fail('should not get here')
  } catch (err) {
    assert.equal(err.message, 'missing username or password')
  }
  assert.end()
})
