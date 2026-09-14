import * as gql from 'gql-query-builder';
import config from 'config';

export function subscribe(query: string, variables: any, callback: (message: any) => void) {
    if (typeof window === 'undefined') return;
    if (!callback) callback = () => {};

    const webSocket = new WebSocket(config.subscriptionUrl, 'graphql-ws');
    const unsubscribe = () => webSocket.close();

    webSocket.onopen = () => {
        webSocket.send('{"type":"connection_init","payload":{}}');

        const message = {
            id: '1',
            type: 'start',
            payload: {
                variables,
                // extensions: {},
                // operationName: null,
                query
            }
        };

        webSocket.send(JSON.stringify(message));
    };

    webSocket.onmessage = callback;
    webSocket.onerror = (err) => {
        console.log(err);
    };

    return unsubscribe;
}
