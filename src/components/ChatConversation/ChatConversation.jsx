// ChatConversation.js
import './ChatConversation.css';

export default function ChatConversation({ userMessaged, setRoom, usersMessaged, setUsersMessaged, setMessageReceived, room }) {

    function selectUserChatRoom() {
        setRoom(userMessaged.room);
    };

    function removeChat() {
        const indexToRemove = usersMessaged.findIndex(obj => obj.name === userMessaged.name);

        if (indexToRemove !== -1) {
            const updatedUsersMessaged = [...usersMessaged];
            updatedUsersMessaged.splice(indexToRemove, 1);
            setUsersMessaged(updatedUsersMessaged);
            setMessageReceived([]);
        }
    };

    return (
        <li>
            <div
                className={`ChatConversationItem ${room === userMessaged.room ? 'active' : ''}`}
                onClick={selectUserChatRoom}
            >
                <p>{userMessaged.name}</p>
                <p onClick={removeChat} className='RemoveChat'>X</p>
            </div>
        </li>
    );
};
