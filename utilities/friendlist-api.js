import sendRequest from "./send-request";
const BASE_URL = 'http://localhost:4741/friendlist';

//For searching for users
export async function getAll() {
    return sendRequest(BASE_URL);
};

//gets the users friends
export async function getFriends() {
    return sendRequest(`${BASE_URL}/getfriendlist`);
};

//For when a user signs up
export async function createFriendList(userID) {
    try {
        await sendRequest(`${BASE_URL}`, 'POST', userID);
    } catch (error) {
        console.error('Error creating friend list', error);
    };
};


//For when a request is sent
export async function sendFriendRequest(friendRequestData) {
    try {
        await sendRequest(`${BASE_URL}/request`, 'POST', friendRequestData)
    } catch (error) {
        console.error('Error creating friend list', error);
    };
};


//For Viewing a request
export async function getFriendRequests() {
    return sendRequest(`${BASE_URL}/getrequests`);
};


//For Declining a request
export async function declineRequest(requestID) {
    try {
        await sendRequest(`${BASE_URL}/${requestID}`, 'DELETE')
    } catch (error) {
        console.error('error deleting request:', error);
    }
}

//For Accepting a Request

export async function acceptRequest(request) {
    try {
        let requestID = request._id;
        await sendRequest(`${BASE_URL}/${requestID}`, 'POST', request)
    } catch (error) {
        console.error('error deleting request:', error);
    }
}

//For Removing a friend

export async function removeFriend(deleteID) {
    try {
        console.log(deleteID)
        await sendRequest(`${BASE_URL}/friends/${deleteID}`, 'DELETE')
    } catch (error) {
        console.error('error removing friend:', error);
    }
}