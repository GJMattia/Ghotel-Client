import './ConfirmRemoveFriend.css';
import * as friendListAPI from '../../../utilities/friendlist-api';

export default function ConfirmRemoveFriend({ user, removeFriendDiv, setRemoveFriendDiv, friendToDelete, friendData, setFriendData }) {

    function toggleRemoveFriendDiv() {
        setRemoveFriendDiv(!removeFriendDiv);

    };

    async function handleRemoveFriend() {
        try {

            let deleteID = friendToDelete.ID;
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
            <p>Are you sure that you want to remove {friendToDelete.name} as a friend?</p>
            <div className='CRFoptions'>
                <button onClick={handleRemoveFriend}>YES</button>
                <button onClick={toggleRemoveFriendDiv}>NO</button>
            </div>
        </div>
    )
}