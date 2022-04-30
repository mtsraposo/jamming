import {SpotifyAuth} from "./SpotifyAuth";

export const Spotify = {
    async savePlaylist(name, trackURIs, apiParams) {
        if (!name || !trackURIs) {
            return undefined;
        } else {
            let playlistId;
            playlistId = await this._createPlaylist(name, apiParams);
            playlistId = await this._addTracksToPlaylist(trackURIs, apiParams, playlistId);
            return playlistId;
        }
    },

    async _addTracksToPlaylist(trackURIs, apiParams, playlistId) {
        const url = apiParams.add_to_playlist_url(playlistId);
        const body = JSON.stringify({
            uris: trackURIs,
        });

        const response = await fetch(url, {method: 'POST', body: body});
        const responseJSON = await response.json();
        return responseJSON['id'];
    },

    async _createPlaylist(name, apiParams) {
        const userId = await this._getUserId(apiParams);

        const url = apiParams.create_playlist_url(userId);
        const body = this._buildSavePlaylistBody(name);

        const response = await fetch(url,
            {method: 'POST', body: body}
        );
        const responseJSON = await response.json();
        return responseJSON['id'];
    },

    async _getUserId(apiParams) {
        const headers = this._buildHeaders();

        let user_url = `${apiParams.user_url}`;
        const response = await fetch(user_url, {headers: headers});
        const responseJSON = await response.json();

        return responseJSON['id'];
    },

    _buildSavePlaylistBody(name) {
        return JSON.stringify({
            name: name,
            public: false,
            collaborative: false,
            description: 'created via API',
        });
    },


    async search(apiParams, term) {
        let track_url = this._buildTrackUrl(apiParams, term);

        await SpotifyAuth.getAccessToken(apiParams);

        const headers = this._buildHeaders();

        const response = await fetch(track_url, {headers: headers});
        const responseJson = await this._checkResponse(response);
        const tracks = await this._parseResponse(responseJson);

        return tracks;
    },

    _buildHeaders() {
        return {
            Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        };
    },

    _buildTrackUrl(apiParams, term) {
        let track_url = `${apiParams.track_url}`;
        track_url += '?type=track';
        track_url += `&q=${term}`;
        return track_url;
    },

    _checkResponse(response) {
        console.log(response);
        if (!response.ok) {
            throw new Error('Request unsuccessful');
        }
        return response.json();
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