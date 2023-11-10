import './FriendList.css';
import { useState, useEffect } from 'react';
import * as friendListAPI from '../../../utilities/friendlist-api';
import FriendItem from '../FriendItem/FriendItem';

export default function FriendList({ user, friends, setFriends }) {

    useEffect(function () {
        async function getFriends() {
            try {
                const friends = await friendListAPI.getFriends();
                setFriends(friends);
            } catch (error) {
                console.error('Error Fetching Questions', error);
            }
        }
        getFriends();
    }, []);


    let friendList = null;
    if (friends) {

        friendList = friends.map((friend, index) => (
            <FriendItem user={user} friend={friend} index={index} key={index} />
        ));
    };


    return (
        <ul className='FriendList'>
            {friendList}
        </ul>
    )
}