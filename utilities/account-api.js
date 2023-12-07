import sendRequest from "./send-request";
// const BASE_URL = 'http://localhost:4741/account';
const BASE_URL = 'https://ghotel-api.onrender.com/account'


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
export async function buyFurni(itemID, accountID) {
    try {
        console.log(itemID, accountID)
        await sendRequest(`${BASE_URL}/${accountID}`, 'PUT', itemID);
    } catch (error) {
        console.error('error updating note:', error);
    }
};
