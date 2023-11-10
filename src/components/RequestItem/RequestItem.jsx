import './RequestItem.css';
import * as friendListAPI from '../../../utilities/friendlist-api';

export default function RequestItem({ user, request, friendRequestData, setFriendRequestData }) {

    async function handleDecline() {
        try {
            await friendListAPI.declineRequest(request._id);
            const updatedRequests = await friendListAPI.getFriendRequests({ userID: user._id });
            setFriendRequestData(updatedRequests);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function handleAccept() {
        try {
            await friendListAPI.acceptRequest(request);

            await handleDecline();
        }
        catch (error) {
            console.error('error creating note'.error)
        }
    }

    return (
        <li className='RequestLine'>
            <div className='RequestItem'>

                <h3>{request.name}</h3>
                <button className='Accept' onClick={handleAccept}>✓</button>
                <button className='Decline' onClick={handleDecline}>X</button>

            </div>
        </li>
    )
}