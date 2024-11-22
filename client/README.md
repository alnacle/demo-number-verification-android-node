# Android Number Verification Client
 
This Android application serves as a client for a Node.js backend that
integrates with Vonage's Number Verification API. The app demonstrates a
complete flow where a user inputs their phone number, requests a login URL, and
performs number verification.

## Features

- Uses **Compose** for a modern, declarative UI.
- Interacts with a Node.js backend to generate a login URL and perform OAuth authentication.
- Verifies the phone number using the **Vonage SDK**.
- Displays real-time status updates and error handling.
- Built with **Kotlin** and utilizes modern libraries such as **OkHttp** and **Kotlin Coroutines**.

## Dependencies

- [Vonage Number Verification SDK](https://github.com/Vonage/number-verification-sdk-android) to force the use of mobile data over WiFi.
- **OkHttp**: For making HTTP requests.
- **Kotlin Coroutines**: For asynchronous programming.
- **Jetpack Compose**: For UI.


## Building the App

1. Open the project in **Android Studio**.
2. Sync Gradle to download dependencies.
3. Connect an Android device or start an emulator.
4. Build and run the app by clicking the **Run** button.


## Usage 

1. Set up the Backend

Ensure the Node.js backend for this app is running. For details, see the [Node.js Backend Documentation](https://github.com/alnacle/demo-number-verification-android-node/server).

2. Configure the App

Update the `LOGIN_URL` in the app code with the URL where the backend is running:

```kotlin
const val LOGIN_URL = "https://your-node-backend-url/login"
```
3. Enter a valid phone number in international format (e.g., `+1234567890`).

4. Tap the **Login** button.

5. The app will:
   - Send a request to the backend for an auth URL.
   - Perform OAuth and phone number verification using the Vonage SDK.

6. The verification result (success or failure) will be displayed on the screen.


## Troubleshooting

1. **Error: HTTP 400/500 from the Backend**
   - Ensure the backend is running and accessible at the `LOGIN_URL`.

2. **Build Issues**
   - Sync Gradle and ensure all dependencies are downloaded.


