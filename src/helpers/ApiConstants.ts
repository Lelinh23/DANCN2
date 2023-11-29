const config = require('../../package.json').projectConfig;
const BACKEND_BASE_URL = config.backendApiBaseUrl;

const CO_QUOC_GIA = {
    BASE_URL: 'https://flagsapi.com/',
    SIZE: {16: '16', 24: '24', 32: '32', 48: '48', 64: '64'},
    STYLE: {FLAT: 'flat', SHINY: 'shiny'},
};

const SERVER_API = {
    BASE_API_URL: `${BACKEND_BASE_URL}/api`,
    REGISTER: '/register',
    LOGIN: '/login',
    USER_EXIST: '/exist-user',
    USER: '/user',
    REFRESH_TOKEN: '/refresh-token'
}

export {CO_QUOC_GIA, SERVER_API};