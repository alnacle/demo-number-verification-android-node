# Number Verification API demo

## Common Prerequisites

- A Vonage developer account.
- An application set up in the Vonage Dashboard with `Network Registry` capability enabled.

## Client

See client [README](client) file.

## Server

See client [README](server) file.


## License
This project is licensed under the MIT License. See the LICENSE file for details.


## Troubleshooting

### Common Issues
1. **Missing Environment Variables**  
   Ensure all required variables (`JWT`, `VONAGE_APPLICATION_ID`, and `REDIRECT_URI`) are set in your `.env` file.

2. **Invalid Node.js Version**  
   This app uses the native `fetch` API, available in Node.js 18+. If you're using an older version, install `node-fetch`:
   ```bash
   npm install node-fetch
   ```

3. **OAuth Errors**  
   Double-check your application setup in the Vonage Dashboard and ensure the redirect URI matches.

