# Node.js OAuth & Number Verification API call

This is a Node.js application that integrates with Vonage APIs to:

1. Generate an OAuth login URL.
2. Handle the OAuth callback to exchange an authorization code for an access token.
3. Verify a phone number using Vonage's Number Verification API.

## Features

- OAuth 2.0 login with Vonage's Identity Provider.
- Uses `fetch` for making HTTP requests.
- Built with Express.js for handling routes.
- Secure configuration via `.env` file.
- Cross-Origin Resource Sharing (CORS) enabled for API calls.


## Prerequisites

- **Node.js 18+** 

## Installation

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file in the project root and configure the following variables:

   ```env
   JWT=your-jwt-token
   VONAGE_APPLICATION_ID=your-application-id
   REDIRECT_URI=http://localhost:3000/callback
   ```

## Usage

Start the server:

```bash
node server.js 
```

## API Endpoints

### POST `/login`

Generates an auth URL for OAuth.

#### Request:

```json
{
  "phone": "+1234567890"
}
```

#### Response:
```json
{
  "url": "https://oidc.idp.vonage.com/oauth2/auth?client_id=..."
}
```


