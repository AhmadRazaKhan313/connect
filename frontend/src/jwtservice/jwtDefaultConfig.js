// const BASE_URL = 'https://api-prod.connectcommunicationslodhran.com/api/v1';
// const BASE_URL = 'https://connect-lodhran-backend-28a56af9dcaa.herokuapp.com/api/v1';
const BASE_IP = '192.168.125.140';
// const BASE_URL = `http://${BASE_IP}:4000/api/v1`;
const BASE_URL = 'http://localhost:4000/api/v1';

export default {
    tokenType: 'Bearer',

    storageTokenKeyName: 'accessToken',
    storageRefreshTokenKeyName: 'refreshToken',
    storageUserKeyName: 'user',
    storageIsLoginKeyName: 'isLogin',

    //auth endpoints
    loginEndpoint: `${BASE_URL}/auth/login`,
    refreshEndpoint: `${BASE_URL}/auth/refreshToken`,
    logoutEndpoint: `${BASE_URL}/auth/logout`,
    updatePasswordEndpoint: `${BASE_URL}/auth/update-password`,
    resetPasswordEndpoint: `${BASE_URL}/auth/reset-password`,

    //isp endpoint
    ispEndpoint: `${BASE_URL}/isp`,

    //package endpoint
    packageEndpoint: `${BASE_URL}/package`,

    //staff endpoint
    staffEndpoint: `${BASE_URL}/staff`,
    updateProfileEndpoint: `${BASE_URL}/staff/update-profile`,

    //user endpoint
    userEndpoint: `${BASE_URL}/user`,

    //entry endpoint
    entryEndpoint: `${BASE_URL}/entry`,

    //invoice endpoint
    invoiceEndpoint: `${BASE_URL}/invoice`,

    //expense endpoint
    expenseEndpoint: `${BASE_URL}/expense`,

    //summary endpoint
    summaryEndpoint: `${BASE_URL}/summary`,

    //sms sending endpoint
    smsSendingEndpoint: `${BASE_URL}/sms-sending`,

    //extra income endpoint
    extraIncomeEndpoint: `${BASE_URL}/extra-income`
};
