import axios from 'axios';
import config from 'config';


const TIMEOUT_DELAY = 999999;

const httpClient = axios.create({
    baseURL: config.apiUrl
});

httpClient.defaults.headers['Content-Type'] = 'application/json';
httpClient.defaults.timeout = TIMEOUT_DELAY;


export const getHttpClient = () => {
    return httpClient;
};
