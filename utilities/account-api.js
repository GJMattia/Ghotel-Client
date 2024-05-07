import sendRequest from "./send-request";
// const BASE_URL = 'http://localhost:4741/account';
const BASE_URL = 'https://ghotel-api.onrender.com/account';


//For Creating Account Schema, used upon account sign up
export async function createAccount(userID) {
    try {
        await sendRequest(`${BASE_URL}`, 'POST', userID);
    } catch (error) {
        console.error('Error creating friend list', error);
    };
};

//Used for getting account data
export async function getAccount() {
    return sendRequest(`${BASE_URL}/getaccount`);
};



//For Buying A Furni
export async function buyFurni(furniInfo) {
    try {
        return await sendRequest(`${BASE_URL}/buy/furni`, 'PUT', furniInfo);
    } catch (error) {
        console.error('error buying furni', error);
    }
};

//For Creating A Room
export async function createRoom(roomInfo) {
    try {
        return await sendRequest(`${BASE_URL}/create/room`, 'PUT', roomInfo);
    } catch (error) {
        console.error('error creating room:', error);
    }
};


//for clearing inventory
export async function clearInventory() {
    try {
        return await sendRequest(`${BASE_URL}/clear/inventory`, 'PUT');
    } catch (error) {
        console.error('error clearing room', error);
    }
};

export async function changeSprite(sprite) {
    try {
        return await sendRequest(`${BASE_URL}/change/sprite`, 'PUT', sprite);
    } catch (error) {
        console.error('error changing sprite', error);
    }
};

//for getting a clicked users sprite

export async function getSprite(username) {
    try {
        return await sendRequest(`${BASE_URL}/user/${username}`, 'GET');
    } catch (error) {
        console.error('error changing sprite', error);
    }
};

export async function changeBadges(badgeList) {
    try {
        return await sendRequest(`${BASE_URL}/change/badges`, 'PUT', badgeList);
    } catch (error) {
        console.error('error changing badges', error);
    }
};

export async function changeMotto(motto) {
    try {
        return await sendRequest(`${BASE_URL}/change/motto`, 'PUT', motto);
    } catch (error) {
        console.error('error changing motto', error);
    }
};