export const SpotifyAuth = {

    async getAccessToken(apiParams) {
        if (!window.localStorage.getItem("accessToken")) {
            const authParams = this._parseUrl();
            if (authParams.accessToken && authParams.expirationTime) {
                this._saveAuthParams(authParams);
            } else {
                this._fetchAccessTokenUrl(apiParams);
            }
        } else {
            return window.localStorage.getItem('accessToken');
        }
    },

    _fetchAccessTokenUrl(apiParams) {
        let url = apiParams.auth_url;
        url += '?client_id=' + encodeURIComponent(apiParams.client_id);
        url += '&response_type=token';
        url += '&scope=' + encodeURIComponent(apiParams.scope);
        url += '&redirect_uri=' + encodeURIComponent(apiParams.redirect_uri);
        url += '&state=' + encodeURIComponent(apiParams.state);
        window.location = url;
    },

    _parseUrl() {
        const accessToken = window.location.href.match("#access_token=([^&]*)&");
        const expirationTime = window.location.href.match("&expires_in=([^&]*)&");

        return {
            accessToken: accessToken ? accessToken[1] : null,
            expirationTime: expirationTime ? expirationTime[1] : null,
        };
    },

    _saveAuthParams(authParams) {
        window.localStorage.setItem("accessToken", authParams.accessToken);
        let expirationTime = Number(authParams.expirationTime);

        window.setTimeout(() => {
            window.localStorage.removeItem('accessToken');
        }, expirationTime * 1000);

        window.history.pushState('Access Token', null, '/');
    },
}