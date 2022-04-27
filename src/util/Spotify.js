let accessToken;

const Spotify = {
    buildAccessTokenUrl(apiParams) {
        let url = apiParams.auth_url;
        url += '?client_id=' + encodeURIComponent(apiParams.client_id);
        url += '&response_type=token';
        url += '&scope=' + encodeURIComponent(apiParams.scope);
        url += '&redirect_uri=' + encodeURIComponent(apiParams.redirect_uri);
        url += '&state=' + encodeURIComponent(apiParams.state);
        window.location = url;
        return url;
    },

    parseResponseUrl(response) {
        const accessToken = window.location.href.match("/access_token=([^&]*)/");
        const expirationTime = window.location.href.match("/expires_in=([^&]*)/");

        return {
            accessToken: accessToken ? accessToken[0] : null,
            expirationTime: expirationTime ? expirationTime[0] : null,
        };
    },

    setResponseVariables(response) {
        window.localStorage.setItem("accessToken", accessToken);
        let expirationTime = response.expirationTime;

        window.setTimeout(() => {
            window.localStorage.removeItem('accessToken');
        }, expirationTime * 1000);

        window.history.pushState('Access Token', null, '/');
    },

    assignToken(response) {
        if (response.accessToken && response.expirationTime) {
            this.setResponseVariables(response);
        }
    },

    async getAccessToken(apiParams) {
        if (window.localStorage.getItem("accessToken")) {
            return Promise.resolve(accessToken);
        } else {
            const authUrl = this.buildAccessTokenUrl(apiParams);
            const response = await fetch(authUrl)
                .then(this._checkResponse)
                .then(this.parseResponseUrl)
                .then(this.assignToken);
            return response.resolve(accessToken);
        }
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

        tracks = response.tracks.map(track => {
            return {
                id: track.id,
                name: track.name,
                artist: track.artists[0],
                album: track.album.name,
                uri: track.uri,
            };
        });

        return Promise.resolve(tracks);
    },

    async search(apiParams, term) {
        let track_url = `${apiParams.track_url}`;
        track_url += '?type=track';
        track_url += `&q=${term}`;

        await this.getAccessToken(apiParams)
            .then(token => {
                window.localStorage.setItem("accessToken", token);
            });

        const headers = {
            Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        };

        const response = await fetch(track_url, {headers: headers})
            .then(this._checkResponse)
            .then(this._parseResponse);

        console.log(response);

        return response;
    },
}

export default Spotify;