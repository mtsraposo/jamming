export const SpotifyAuth = {

    async refreshAccessToken(apiParams) {
        if (!window.localStorage.getItem("accessToken")) {
            const accessTokenUrl = this._buildAccessTokenUrl(apiParams);
            const windowFeatures = this._genAuthWindowFeatures();
            const popup = await window.open(accessTokenUrl, "Spotify auth", windowFeatures);
            await this._parseUrl(popup);
            this._scheduleTokenExpiration();
        }
    },

    _buildAccessTokenUrl(apiParams) {
        let url = apiParams.auth_url;
        url += '?client_id=' + encodeURIComponent(apiParams.client_id);
        url += '&response_type=token';
        url += '&scope=' + encodeURIComponent(apiParams.scope);
        url += '&redirect_uri=' + encodeURIComponent(apiParams.redirect_uri);
        url += '&state=' + encodeURIComponent(apiParams.state);
        return url;
    },

    _genAuthWindowFeatures() {
        const width = 500;
        const height = 400;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2.5;
        let windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
        windowFeatures += ",popup";
        return windowFeatures;
    },

    _parseUrl(popup) {
        const timer = setInterval(() => {
            const accessToken = popup.location.href.match("#access_token=([^&]*)&");
            const expirationTime = popup.location.href.match("&expires_in=([^&]*)&");

            if (accessToken && expirationTime) {
                window.localStorage.setItem("accessToken", accessToken[1]);
                window.localStorage.setItem("expirationTime", expirationTime[1]);
                popup.close();
                clearInterval(timer);
            }

        }, 500);
    },

    _scheduleTokenExpiration() {
        let expirationTime = Number(window.localStorage.getItem('expirationTime'));

        window.setTimeout(this._expireToken, expirationTime * 1000);
    },

    _expireToken() {
        window.localStorage.removeItem('accessToken');
        console.log('Access token expired');
    }

}