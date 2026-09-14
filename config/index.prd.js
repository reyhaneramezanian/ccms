const baseUrl = 'https://aps-ccms-prd.azurewebsites.net';
const baseCononicalUrl = 'https://aps-ccms-prd.azurewebsites.net';
const apiUrl = 'https://aps-ccms-prd.azurewebsites.net';
const generatorUrl = 'https://aps-ccms-prd.azurewebsites.net/graphql/';
const subscriptionUrl = 'wss://aps-ccms-prd.azurewebsites.net/graphql';
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
        apiKey: 'AIzaSyCvDwUtNAb2LMyhvgzoBOxyL2yh5URRojw',
        authDomain: 'aps-ccms-prd.firebaseapp.com',
        projectId: 'aps-ccms-prd',
        storageBucket: 'aps-ccms-prd.appspot.com',
        messagingSenderId: '562712577554',
        appId: '1:562712577554:web:c2ca70c61baf7fef373acb'
    }
};

module.exports = config;
