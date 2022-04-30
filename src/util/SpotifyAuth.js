export const SpotifyAuth = {

    async getAccessToken(apiParams) {
        if (!window.localStorage.getItem("accessToken")) {
            const authParams = this.parseCurrentUrl();
            if (authParams.accessToken && authParams.expirationTime) {
                this.saveAuthParams(authParams);
            } else {
                const authUrl = this.buildAccessTokenUrl(apiParams);
                await fetch(authUrl, {redirect: 'follow'});
            }
        } else {
            return window.localStorage.getItem('accessToken');
        }
    },

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

    parseCurrentUrl() {
        const accessToken = window.location.href.match("#access_token=([^&]*)&");
        const expirationTime = window.location.href.match("&expires_in=([^&]*)&");

        return {
            accessToken: accessToken ? accessToken[1] : null,
            expirationTime: expirationTime ? expirationTime[1] : null,
        };
    },

    saveAuthParams(authParams) {
        window.localStorage.setItem("accessToken", authParams.accessToken);
        let expirationTime = Number(authParams.expirationTime);

        window.setTimeout(() => {
            window.localStorage.removeItem('accessToken');
        }, expirationTime * 1000);

        window.history.pushState('Access Token', null, '/');
    },
}