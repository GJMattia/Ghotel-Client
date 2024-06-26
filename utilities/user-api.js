import sendRequest from './send-request'
// const BASE_URL = 'http://localhost:4741/users';
const BASE_URL = 'https://ghotel-api.onrender.com/users';

export async function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData)
}

export async function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}

export async function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`)
}