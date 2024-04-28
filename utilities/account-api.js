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
export async function buyFurni(itemID, accountID) {
    try {
        console.log(itemID, accountID)
        await sendRequest(`${BASE_URL}/${accountID}`, 'PUT', itemID);
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

export async function placeFurni(furniInfo) {
    try {
        return await sendRequest(`${BASE_URL}/place/furni`, 'PUT', furniInfo);
    } catch (error) {
        console.error('error creating room', error);
    }
};


//For Clearing an entire room
export async function clearRoom(roomID) {
    try {
        return await sendRequest(`${BASE_URL}/clear/room`, 'PUT', roomID);
    } catch (error) {
        console.error('error clearing room', error);
    }
};

//Pick up a furni
export async function pickUpFurni(pickupInfo) {
    try {
        return await sendRequest(`${BASE_URL}/pickup/furni`, 'PUT', pickupInfo);
    } catch (error) {
        console.error('error picking up furni', error);
    }
};

//Rotate Furni

export async function rotateFurni(rotateInfo) {
    try {
        return await sendRequest(`${BASE_URL}/rotate/furni`, 'PUT', rotateInfo);
    } catch (error) {
        console.error('error rotating furni', error);
    }
};

// for using furni
export async function useFurni(useInfo) {
    try {
        return await sendRequest(`${BASE_URL}/use/furni`, 'PUT', useInfo);
    } catch (error) {
        console.error('error using up furni', error);
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

//for deleting a room

export async function deleteRoom(roomIndex) {
    try {
        return await sendRequest(`${BASE_URL}/delete/room`, 'PUT', roomIndex);
    } catch (error) {
        console.error('error deleting room', error);
    }
};

//changing room color

export async function roomColor(roomIndex) {
    try {
        return await sendRequest(`${BASE_URL}/room/color`, 'PUT', roomIndex);
    } catch (error) {
        console.error('error changing room color', error);
    }
};