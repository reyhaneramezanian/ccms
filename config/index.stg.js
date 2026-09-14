const baseUrl = 'https://aps-ccms-stg.azurewebsites.net';
const baseCononicalUrl = 'https://aps-ccms-stg.azurewebsites.net';
const apiUrl = 'https://aps-ccms-stg.azurewebsites.net';
const generatorUrl = 'https://aps-ccms-stg.azurewebsites.net/graphql/';
const subscriptionUrl = 'wss://aps-ccms-stg.azurewebsites.net/graphql';
const supportMail = 'support@mychimebeauty.com';

const config = {
    apiUrl,
    baseUrl,
    generatorUrl,
    baseCononicalUrl,
    subscriptionUrl,
    supportMail,
    blobBaseUrl: 'https://apsccmsstorage.blob.core.windows.net',
    blobUrl:
        'https://apsccmsstorage.blob.core.windows.net/images?sp=racwdli&st=2022-09-05T10:34:59Z&se=2122-09-05T18:34:59Z&spr=https&sv=2021-06-08&sr=c&sig=OMAgEDqgjC%2FjGSC6BB44dbJfb0MJovVRaaO8nx2S0rM%3D',
    containerName: 'images',
    firebase: {
        apiKey: 'AIzaSyB-W2pWZ2bdO5uZ2Fsi5rMmmr8hhP71HXo',
        authDomain: 'aps-ccms-stg.firebaseapp.com',
        projectId: 'aps-ccms-stg',
        storageBucket: 'aps-ccms-stg.appspot.com',
        messagingSenderId: '787752663775',
        appId: '1:787752663775:web:81a9ed410b3a85e18f876a'
    }
};

module.exports = config;
