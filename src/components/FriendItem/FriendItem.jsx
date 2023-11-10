import './FriendItem.css';

export default function FriendItem({ friend }) {

    return (
        <li><div>
            <h3>{friend.name}</h3>

        </div></li>
    )
}