const baseUrl = 'https://aps-ccms-qa.azurewebsites.net';
const baseCononicalUrl = 'https://aps-ccms-qa.azurewebsites.net';
const apiUrl = 'https://aps-ccms-qa.azurewebsites.net';
const generatorUrl = 'https://aps-ccms-qa.azurewebsites.net/graphql/';
const subscriptionUrl = 'wss://aps-ccms-qa.azurewebsites.net/graphql';
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
        apiKey: 'AIzaSyCAfPAA3lbpkSgHmYC0HBPWSjB2DwXdyU0',
        authDomain: 'aps-ccms-qa.firebaseapp.com',
        projectId: 'aps-ccms-qa',
        storageBucket: 'aps-ccms-qa.appspot.com',
        messagingSenderId: '350973536863',
        appId: '1:350973536863:android:b7f1259dfc2414aa8cc9ea'
    }
};

module.exports = config;
