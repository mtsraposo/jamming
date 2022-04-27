import generateRandomString from "./id_generator";
import {clientId} from "./credentials";

export const apiParams = {
    client_id: clientId,
    redirect_uri: 'http://localhost:3000',
    scope: 'playlist-modify-public',
    state: generateRandomString(16),
    auth_url: 'https://accounts.spotify.com/authorize',
    track_url: 'https://api.spotify.com/v1/search',
}