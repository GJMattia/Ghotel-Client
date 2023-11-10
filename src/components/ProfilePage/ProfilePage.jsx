import './ProfilePage.css';
import FriendSearch from '../FriendSearch/FriendSearch';
import FriendRequests from '../FriendRequests/FriendRequests';

import { useState } from 'react';

export default function ProfilePage({ user }) {

    let [searchDiv, setSearchDiv] = useState(false);
    let [requestDiv, setRequestDiv] = useState(false);
    let [friendDiv, setFriendDiv] = useState(false);


    function handleRequests() {
        setRequestDiv(!requestDiv);
    };


    function handleSearch() {
        setSearchDiv(!searchDiv);
    };


    return (
        <>
            <div className='ProfileDiv'>
                <h1>Username: {user.name}</h1>
                <h1>Email: {user.email}</h1>
                <h2>Friends List</h2>
                <button onClick={handleSearch} >Search for friends</button>
                <button onClick={handleRequests} >Friend Requests</button>
            </div>
            {requestDiv && <FriendRequests user={user} />}
            {searchDiv && <FriendSearch user={user} />}
        </>
    )
}