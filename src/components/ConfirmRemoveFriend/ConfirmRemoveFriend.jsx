import './ConfirmRemoveFriend.css';
import * as friendListAPI from '../../../utilities/friendlist-api';

export default function ConfirmRemoveFriend({ user, removeFriendDiv, setRemoveFriendDiv, friendToDelete, friendData, setFriendData }) {

    function toggleRemoveFriendDiv() {
        setRemoveFriendDiv(!removeFriendDiv);

    }

    async function handleRemoveFriend() {
        try {
            let deleteID = friendToDelete._id;
            await friendListAPI.removeFriend(deleteID);

            const friends = await friendListAPI.getFriends();
            setFriendData(friends);
            setRemoveFriendDiv(!removeFriendDiv);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    return (
        <div className='ConfirmRemoveFriend'>
            <h3>Do you want to delete {friendToDelete.name} from your FriendList?</h3>
            <div className='CRFoptions'>
                <button onClick={handleRemoveFriend}>YES</button>
                <button onClick={toggleRemoveFriendDiv}>NO</button>
            </div>
        </div>
    )
}