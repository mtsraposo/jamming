import {SpotifyAuth} from "./auth";

export const Spotify = {
    async search(apiParams, term) {
        let track_url = this._buildTrackUrl(apiParams, term);

        await SpotifyAuth.getAccessToken(apiParams);

        const headers = {
            Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        };

        const response = await fetch(track_url, {headers: headers})
        const responseJson = await this._checkResponse(response);
        const tracks = await this._parseResponse(responseJson);

        return tracks;
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