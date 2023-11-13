import './FriendItem.css';

export default function FriendItem({ friend, removeFriendDiv, setRemoveFriendDiv, setFriendToDelete }) {

    function toggleRemoveFriend() {
        setRemoveFriendDiv(!removeFriendDiv);
        setFriendToDelete(friend)
    }

    return (
        <li className='FriendLine'><div>
            <p>{friend.name}</p>
            <button>💬</button>
            <button onClick={toggleRemoveFriend}>X</button>
        </div></li>
    )
}