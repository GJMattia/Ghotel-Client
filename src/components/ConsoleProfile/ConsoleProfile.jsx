import './ConsoleProfile.css';
import { useState, useEffect } from 'react';
import * as friendListAPI from '../../../utilities/friendlist-api';

export default function ConsoleProfile({ user }) {

    let [friendRequestData, setFriendRequestData] = useState(1);

    useEffect(function () {
        async function getFriendRequests() {
            try {
                const updatedRequests = await friendListAPI.getFriendRequests({ userID: user._id });
                setFriendRequestData(updatedRequests);
            } catch (error) {
                console.error('Error Fetching Questions', error);
            }
        }
        getFriendRequests();
    }, []);


    return (
        <div className='ConsoleProfile'>
            <h1>Username: {user.name}</h1>
            <h1>Email: {user.email}</h1>
            <h3>You currently have {friendRequestData.length} friend request(s)</h3>
        </div>
    )
}