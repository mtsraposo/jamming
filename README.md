# Jamming

This app uses the <a href=https://developer.spotify.com>Spotify API</a> to log into a user's account, search tracks and create new playlists, directly from the app's front-end.

To use the API, create an application <a href="https://developer.spotify.com/my-applications/#!/applications">here</a>, create an application and obtain a client_id. Then, create a file `credentials.js` in `/src/util/` with the following content:

```javascript
export const clientId = '<YOUR_CLIENT_ID_HERE>';
```

