import './FriendItem.css';

export default function FriendItem({ friend }) {

    return (
        <li className='FriendLine'><div>
            <p>{friend.name}</p>

        </div></li>
    )
}