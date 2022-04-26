import {apiParams} from "./api_parameters";

let accessToken;

const Spotify = {}

const buildQueryUrl = (apiParams) => {
    let url = apiParams.url;
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(apiParams.client_id);
    url += '&scope=' + encodeURIComponent(apiParams.scope);
    url += '&redirect_uri=' + encodeURIComponent(apiParams.redirect_uri);
    url += '&state=' + encodeURIComponent(apiParams.state);
    return url;
}


const getAccessToken = async (apiParams) => {
    if (accessToken) {
        return accessToken;
    } else {
        const url = buildQueryUrl(apiParams);
        const responseUrl = await fetch(url);

        const accessTokenQuery = responseUrl.split('#')[1].split('&')[0]
        const accessToken = accessTokenQuery.split('=')[1];

        const expirationTime = responseUrl.split('&').find((attr_value) => attr_value.split('=')[0] === "expires_in");

        if (accessToken && expirationTime) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('expirationTime', expirationTime);

            setTimeout(() => {
                localStorage.removeItem('expirationTime');
            }, expirationTime)

        }


    }
}

export default Spotify;