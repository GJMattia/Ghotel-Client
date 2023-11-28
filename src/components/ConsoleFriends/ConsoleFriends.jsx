import './ConsoleFriends.css';
import { useState, useEffect } from 'react';
import * as friendListAPI from '../../../utilities/friendlist-api';
import FriendItem from '../FriendItem/FriendItem';
import ConfirmRemoveFriend from '../ConfirmRemoveFriend/ConfirmRemoveFriend';

export default function ConsoleFriends({ user, setUsersMessaged, usersMessaged, setRoom, setChatDiv }) {

    const [friendData, setFriendData] = useState(null);
    const [removeFriendDiv, setRemoveFriendDiv] = useState(false);
    const [friendToDelete, setFriendToDelete] = useState(null);
    const [userRoom, setUserRoom] = useState(null);
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

    useEffect(function () {
        async function getUserRoom() {
            try {
                const room = await friendListAPI.getUserRoom();
                setUserRoom(room);
            } catch (error) {
                console.error('Error Fetching Questions', error);
            }
        }
        getUserRoom();
    }, []);


    let friendList = null;
    if (friendData && userRoom) {

        friendList = friendData.map((friend, index) => (
            <FriendItem user={user} setChatDiv={setChatDiv} userRoom={userRoom} setRoom={setRoom} usersMessaged={usersMessaged} setUsersMessaged={setUsersMessaged} friend={friend} index={index} key={index} removeFriendDiv={removeFriendDiv} setRemoveFriendDiv={setRemoveFriendDiv} setFriendToDelete={setFriendToDelete} />
        ));
    };

    return (
        <div className='ConsoleFriends'>
            {removeFriendDiv && <ConfirmRemoveFriend user={user} friendData={friendData} setFriendData={setFriendData} removeFriendDiv={removeFriendDiv} setRemoveFriendDiv={setRemoveFriendDiv} friendToDelete={friendToDelete} />}
            <h3 className='FriendListTitle'>Friends</h3>
            <ul className='FriendList'>
                {friendList}
            </ul>
        </div>
    )
}