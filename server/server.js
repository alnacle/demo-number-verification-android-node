const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
require("dotenv").config();

// URIs
const oidc_auth_uri = "https://oidc.idp.vonage.com/oauth2/auth";
const camara_auth_uri = "https://api-eu-3.vonage.com/oauth2/token";
const nv_uri = "https://api-eu.vonage.com/camara/number-verification/v031/verify";

// Load config from .env
const jwt = process.env.JWT;
const client_id = process.env.VONAGE_APPLICATION_ID;
const redirect_ui = process.env.REDIRECT_URI || "http://localhost:3000/callback";

if (!jwt || !client_id || !redirect_ui) {
  throw new Error(
    "Missing required environment variables: JWT, VONAGE_APPLICATION_ID, or REDIRECT_URI",
  );
}

const generateRandomString = (length) =>
  crypto.randomBytes(length).toString("hex").slice(0, length);

const makeFetchRequest = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP Error: ${response.status} - ${error}`);
  }
  return response.json();
};

// App Setup
const app = express();

app.set("view engine");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.post("/login", (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: "Phone number is required." });
  }

  const state = generateRandomString(16);
  const scope =
    "openid dpv:FraudPreventionAndDetection#number-verification-verify-read";
  const query = new URLSearchParams({
    client_id: client_id,
    response_type: "code",
    scope,
    redirect_uri: redirect_ui,
    state,
    login_hint: `+${phone}`,
  });

  const url = `${oidc_auth_uri}?${query.toString()}`;
  res.json({ url });
});

app.get("/callback", async (req, res) => {
  const { code, state, error: errorDescription } = req.query;

  if (!code || !state) {
    return res
      .status(500)
      .json({ error: errorDescription || "Invalid callback request" });
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await makeFetchRequest(camara_auth_uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${jwt}`,
      },
      body: new URLSearchParams({
        code,
        redirect_uri: redirect_ui,
        grant_type: "authorization_code",
      }),
    });

    const { access_token: accessToken } = tokenResponse;

    // Call Number Verification API
    const nvResponse = await makeFetchRequest(nv_uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ phoneNumber: req.body.phone }),
    });

    res.json(nvResponse);
  } catch (error) {
    console.error("Error during callback processing:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
