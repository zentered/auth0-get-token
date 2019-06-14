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
    cfg.realm = process.env.AUTH0_REALM
    cfg.scope = process.env.AUTH0_SCOPE
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
      realm: cfg.realm,
      scope: cfg.scope
    }
  }).json

  return {
    accessToken: token.access_token,
    idToken: token.id_token
  }
}

module.exports = getToken
