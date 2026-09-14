import { GraphQLClient } from 'graphql-request';

import config from 'config';
import { ACCESS_TOKEN_KEY } from 'src/constants/storage';
import { getCookieStorage } from '../storage/cookie';

const idToken = getCookieStorage(ACCESS_TOKEN_KEY) || 'token';

const client = new GraphQLClient(`${config.apiUrl}/graphql`, {
    headers: { Authorization: `Bearer ${idToken}` }
});

export function setAuthHeader(idToken: string) {
    client.setHeader('Authorization', `Bearer ${idToken}`);
}

export default client;
