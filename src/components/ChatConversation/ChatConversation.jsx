import './ChatConversation.css';

export default function ChatConversation({ userMessaged, setRoom }) {

    function selectUserChatRoom() {
        setRoom(userMessaged.room)
    }


    return (
        <li className='ChatConversationItem' onClick={selectUserChatRoom}>{userMessaged.name}</li>
    )
}