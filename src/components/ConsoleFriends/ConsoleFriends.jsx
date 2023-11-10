import './ConsoleFriends.css';
import { useState, useEffect } from 'react';
import * as friendListAPI from '../../../utilities/friendlist-api';
import FriendItem from '../FriendItem/FriendItem';

export default function ConsoleFriends({ user }) {

    const [friendData, setFriendData] = useState(null);

    useEffect(function () {
        async function getFriends() {
            try {
                const friends = await friendListAPI.getFriends();
                setFriendData(friends);
            } catch (error) {
                console.error('Error Fetching Questions', error);
            }
        }
        getFriends();
    }, []);

    let friendList = null;
    if (friendData) {

        friendList = friendData.map((friend, index) => (
            <FriendItem user={user} friend={friend} index={index} key={index} />
        ));
    };


    return (
        <>
            <h3 className='FriendListTitle'>Friends</h3>
            <ul className='FriendList'>
                {friendList}
            </ul>
        </>
    )
}