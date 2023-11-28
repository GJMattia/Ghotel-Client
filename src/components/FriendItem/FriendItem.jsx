import './FriendItem.css';

export default function FriendItem({ friend, setChatDiv, userRoom, removeFriendDiv, setRemoveFriendDiv, setFriendToDelete, usersMessaged, setUsersMessaged, setRoom }) {

    function toggleRemoveFriend() {
        setRemoveFriendDiv(!removeFriendDiv);
        setFriendToDelete(friend)
    };

    function calculateRoom(room1, room2) {
        return room1 + room2;
    };


    function messageUser() {

        const isUserAlreadyMessaged = usersMessaged.some(user => user.name === friend.name);

        if (isUserAlreadyMessaged) {
            return;
        };

        let messagedUser = {
            name: friend.name,
            room: calculateRoom(friend.room, userRoom)
        };

        setChatDiv(true);
        setRoom(messagedUser.room)
        const updatedUsersMessaged = [...usersMessaged, messagedUser];
        setUsersMessaged(updatedUsersMessaged);
    };

    return (
        <li className='FriendLine'><div>
            <p>{friend.name}</p>
            <div className='FriendOptions'>
                <button onClick={messageUser}>MSG</button>
                <button onClick={toggleRemoveFriend}>RMV</button>
            </div>
        </div></li>
    )
};