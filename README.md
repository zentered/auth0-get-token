[![Build Status](https://travis-ci.com/heneise/auth0-get-token.svg?branch=master)](https://travis-ci.com/heneise/auth0-get-token)

# Auth0 Token

Getting an access token for your API.

This can be used for integration testing, to dynamically obtain tokens when needed. No hardcoded accessTokens, no mocking.

## Usage

From the auth0 API, copy:

- API IDENTIFIER (ie. "auth0-get-token") as AUTH0_AUDIENCE

From the auth0 Application, copy:

- Domain as AUTH0_BASE_URL (add https://)
- Client ID
- Client Secret

Then, you can retrieve a token:

    const getToken = require('auth0-get-token')
    const tokens = await getToken('test@heneise.io', 'HelloTest1')
