import {SpotifyAuth} from "./SpotifyAuth";

const SpotifyUtils = {
    _buildHeaders() {
        return {
            'Authorization': `Bearer ${window.localStorage.getItem("accessToken")}`,
        };
    },

    _checkResponse(response) {
        if (!response.ok) {
            throw new Error('Request unsuccessful');
        }
        return response.json();
    },
}

const SpotifyPlaylist = {
    async savePlaylist(name, tracks, apiParams) {
        if (!name || !tracks) {
            return undefined;
        } else {
            await SpotifyAuth.refreshAccessToken(apiParams);

            let playlistId;
            playlistId = await this._createPlaylist(name, apiParams);
            playlistId = await this._addTracksToPlaylist(tracks, apiParams, playlistId);
            return playlistId;
        }
    },

    async _createPlaylist(name, apiParams) {
        const userId = await this._getUserId(apiParams);

        const url = apiParams.create_playlist_url(userId);
        const body = this._buildCreatePlaylistBody(name);
        const headers = {...SpotifyUtils._buildHeaders(), 'Content-Type': 'application/json'};

        const response = await fetch(url,
            {method: 'POST', body: body, headers: headers}
        );
        const responseJSON = await SpotifyUtils._checkResponse(response);
        return responseJSON['id'];
    },

    async _getUserId(apiParams) {
        const headers = SpotifyUtils._buildHeaders();

        let user_url = `${apiParams.user_url}`;
        const response = await fetch(user_url, {headers: headers});
        const responseJSON = await response.json();

        return responseJSON['id'];
    },

    _buildCreatePlaylistBody(name) {
        return JSON.stringify({
            name: name
        });
    },

    async _addTracksToPlaylist(tracks, apiParams, playlistId) {
        const url = apiParams.add_to_playlist_url(playlistId);
        const headers = {...SpotifyUtils._buildHeaders(), 'Content-Type': 'application/json'};
        const body = this._buildSavePlaylistBody(tracks);

        const response = await fetch(url, {method: 'POST', body: body, headers: headers});
        const responseJSON = await SpotifyUtils._checkResponse(response);
        return responseJSON['id'];
    },

    _buildSavePlaylistBody(tracks) {
        const trackURIs = tracks.map((track) => track.uri);
        return JSON.stringify({
            uris: trackURIs,
        });
    },
}

const SpotifySearch = {
    async search(apiParams, term) {
        await SpotifyAuth.refreshAccessToken(apiParams);

        const track_url = this._buildTrackUrl(apiParams, term);
        const headers = SpotifyUtils._buildHeaders();

        const response = await fetch(track_url, {headers: headers});
        const responseJson = await SpotifyUtils._checkResponse(response);
        const tracks = await this._parseResponse(responseJson);

        return tracks;
    },

    _buildTrackUrl(apiParams, term) {
        let track_url = `${apiParams.track_url}`;
        track_url += '?type=track';
        track_url += `&q=${term}`;
        return track_url;
    },

    _parseResponse(response) {
        let tracks = [];

        if (!response.tracks) {
            return tracks;
        }

        tracks = response.tracks.items.map(track => {
            return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            };
        });

        return tracks;
    },
}

export const Spotify = {
    ...SpotifyPlaylist,
    ...SpotifySearch,
}