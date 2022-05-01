import generateRandomString from "./id_generator";
import {clientId} from "./credentials";

export const apiParams = {
    client_id: clientId,
    // redirect_uri: 'http://ohmyjam.surge.sh',
    redirect_uri: 'http://localhost:3000',
    scope: 'playlist-modify-public',
    state: generateRandomString(16),
    auth_url: 'https://accounts.spotify.com/authorize',
    track_url: 'https://api.spotify.com/v1/search',
    user_url: 'https://api.spotify.com/v1/me',
    create_playlist_url: (userId) => `https://api.spotify.com/v1/users/${userId}/playlists`,
    add_to_playlist_url: (playlistId) => `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
}