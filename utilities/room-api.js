import sendRequest from "./send-request";
// const BASE_URL = 'http://localhost:4741/room';
const BASE_URL = 'https://ghotel-api.onrender.com/room';

//Creating a room
export async function createRoom(roomInfo) {
    try {
        return await sendRequest(`${BASE_URL}/create/room`, 'POST', roomInfo);
    } catch (error) {
        console.error('Error creating room', error);
    };
};

//Getting users rooms
export async function getUserRooms() {
    try {
        return await sendRequest(`${BASE_URL}/user/rooms`, 'GET');
    } catch (error) {
        console.error('Error getting users rooms', error);
    };
};

// Getting Room Data
export async function getRoomData(roomID) {
    try {
        return await sendRequest(`${BASE_URL}/${roomID}`, 'GET')
    } catch (error) {
        console.error('Error getting room', error);
    };
};

//Place Furni
export async function placeFurni(furniInfo) {
    try {
        return await sendRequest(`${BASE_URL}/place/furni`, 'PUT', furniInfo);
    } catch (error) {
        console.error('error creating room', error);
    }
};


//Pick up a furni
export async function pickFurni(furniInfo) {
    try {
        return await sendRequest(`${BASE_URL}/pick/furni`, 'PUT', furniInfo);
    } catch (error) {
        console.error('error picking up furni', error);
    }
};

//Rotate a furni
export async function rotateFurni(furniInfo) {
    try {
        return await sendRequest(`${BASE_URL}/rotate/furni`, 'PUT', furniInfo);
    } catch (error) {
        console.error('error rotating furni', error);
    }
};

//Use a furni
export async function useFurni(furniInfo) {
    try {
        return await sendRequest(`${BASE_URL}/use/furni`, 'PUT', furniInfo);
    } catch (error) {
        console.error('error rotating furni', error);
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

//for deleting a room
export async function deleteRoom(roomID) {
    try {
        return await sendRequest(`${BASE_URL}/${roomID}`, 'DELETE');
    } catch (error) {
        console.error('error deleting room', error);
    }
};

//changing room color
export async function roomColor(roomInfo) {
    try {
        return await sendRequest(`${BASE_URL}/room/color`, 'PUT', roomInfo);
    } catch (error) {
        console.error('error changing room color', error);
    }
};

//for searching a user up and returning their rooms
export async function roomSearch(userSearch) {
    try {
        return await sendRequest(`${BASE_URL}/search/user`, 'PUT', userSearch);
    } catch (error) {
        console.error('error searching', error);
    }
};

//wall type
export async function wallType(roomInfo) {
    try {
        return await sendRequest(`${BASE_URL}/room/wall`, 'PUT', roomInfo);
    } catch (error) {
        console.error('error changing room color', error);
    }
};