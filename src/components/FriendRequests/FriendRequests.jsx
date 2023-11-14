import './FriendRequests.css';
import * as friendListAPI from '../../../utilities/friendlist-api';
import { useEffect, useState } from 'react';
import RequestItem from '../RequestItem/RequestItem';

export default function FriendRequests({ user }) {

    let [friendRequestData, setFriendRequestData] = useState(null);

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


    let requests = null;

    if (friendRequestData) {

        requests = friendRequestData.map((request, index) => (
            <RequestItem user={user} friendRequestData={friendRequestData} setFriendRequestData={setFriendRequestData} request={request} index={index} key={index} />
        ));
    }

    return (
        <div className='FriendRequestDiv'>
            <h3>Friend Requests</h3>
            {requests && requests.length > 0 ? (
                <ul className='FriendRequests'>
                    {requests}
                </ul>
            ) : (
                <p>You currently have no requests</p>
            )}
        </div>
    )
}