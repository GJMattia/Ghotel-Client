import './FriendItem.css';

export default function FriendItem({ friend, removeFriendDiv, setRemoveFriendDiv, setFriendToDelete, usersMessaged, setUsersMessaged }) {

    function toggleRemoveFriend() {
        setRemoveFriendDiv(!removeFriendDiv);
        setFriendToDelete(friend)
    }

    function messageUser() {
        let messagedUser = {
            name: friend.name,
            room: 100
        }

        const updatedUsersMessaged = [...usersMessaged, messagedUser];

        console.log(usersMessaged)
        setUsersMessaged(updatedUsersMessaged);
    }

    return (
        <li className='FriendLine'><div>
            <p>{friend.name}</p>
            <div className='FriendOptions'>
                <button onClick={messageUser}>MSG</button>
                <button onClick={toggleRemoveFriend}>RMV</button>
            </div>
        </div></li>
    )
}