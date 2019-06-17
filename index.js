const r2 = require('r2')

async function getToken (username, password, config) {
  let cfg = {}

  if (config) {
    cfg = config
  } else {
    cfg.url = process.env.AUTH0_BASE_URL
    cfg.clientId = process.env.AUTH0_CLIENT_ID
    cfg.clientSecret = process.env.AUTH0_CLIENT_SECRET
    cfg.audience = process.env.AUTH0_AUDIENCE
    cfg.scope = process.env.AUTH0_SCOPE || 'openid'
  }

  if (!username || !password) {
    throw new Error('missing username or password')
  }

  if (!cfg.url || !cfg.clientId || !cfg.clientSecret) {
    throw new Error('missing config. Please check base url, client id and client secret are valid')
  }

  const token = await r2(`${cfg.url}/oauth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    json: {
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
      audience: cfg.audience,
      grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
      username: username,
      password: password,
      realm: 'Username-Password-Authentication',
      scope: cfg.scope
    }
  }).json

  if (token && token.error) {
    throw new Error(token.error)
  }

  return {
    accessToken: token.access_token,
    idToken: token.id_token
  }
}

module.exports = getToken
