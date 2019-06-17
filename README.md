[![Build Status](https://travis-ci.com/heneise/auth0-get-token.svg?branch=master)](https://travis-ci.com/heneise/auth0-get-token)

# Auth0 Token

Getting an access token for your API.

This can be used for integration testing, to dynamically obtain tokens when needed. No hardcoded accessTokens, no mocking.

## Auth0 Setup

![auth0 grant settings](https://user-images.githubusercontent.com/74390/59589705-39a3ce80-90f3-11e9-8a82-f56cbb283eae.png)

- In your [Auth0 Dashboard](https://manage.auth0.com/dashboard/) create a new API if you didn't already do so (you can copy the API Identifier right away and paste into the config)
- Head over to "Applications", there should be a Machine-to-Machine application with the same name as your API and "(Test Application)"
- Click on the Test Application to see the settings
- In the very bottom, click "Show Advanced Settings"
- Go to the tab "Grant Types"
- Select "Password" (this enables user/password requests for this library)


## Usage

From the auth0 API, copy:

- API IDENTIFIER (ie. "auth0-get-token") as `AUTH0_AUDIENCE`

From the auth0 Application, copy:

- Domain as `AUTH0_BASE_URL` (add `https://`)
- Client ID as `AUTH0_CLIENT_ID`
- Client Secret as `AUTH0_CLIENT_SECRET`

Then, you can retrieve a token:

    const getToken = require('auth0-get-token')
    const tokens = await getToken('username', 'test-password')
