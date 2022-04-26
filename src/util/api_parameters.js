import generateRandomString from "./id_generator";
import {clientId} from "./credentials";

export const apiParams = {
    client_id: clientId,
    redirect_uri: 'http://localhost:3000',
    scope: 'user-read-private user-read-email',
    state: generateRandomString(16),
    url: 'https://accounts.spotify.com/authorize',
}