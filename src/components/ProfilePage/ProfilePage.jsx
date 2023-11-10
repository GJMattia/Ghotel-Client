import './ProfilePage.css';
import FriendSearch from '../FriendSearch/FriendSearch';
import FriendRequests from '../FriendRequests/FriendRequests';
import FriendList from '../FriendList/FriendList';
import { useState } from 'react';

export default function ProfilePage({ user }) {

    let [searchDiv, setSearchDiv] = useState(false);
    let [requestDiv, setRequestDiv] = useState(false);
    let [friendDiv, setFriendDiv] = useState(false);
    let [friends, setFriends] = useState(null);

    function handleRequests() {
        setRequestDiv(!requestDiv);
    };


    function handleSearch() {
        setSearchDiv(!searchDiv);
    };

    function handleFriendList() {
        setFriendDiv(!friendDiv);
    };


    return (
        <>
            <div className='ProfileDiv'>
                <h1>Username: {user.name}</h1>
                <h1>Email: {user.email}</h1>
                <h2>Friends List</h2>
                <button onClick={handleSearch} >Search for friends</button>
                <button onClick={handleRequests} >Friend Requests</button>
                <button onClick={handleFriendList} >View Friend List</button>
            </div>
            {friendDiv && <FriendList user={user} friends={friends} setFriends={setFriends} />}
            {requestDiv && <FriendRequests user={user} />}
            {searchDiv && <FriendSearch user={user} />}
        </>
    )
}