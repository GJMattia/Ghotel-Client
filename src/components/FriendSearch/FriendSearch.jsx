import './FriendSearch.css';
import { useEffect, useState } from 'react';
import * as friendListAPI from '../../../utilities/friendlist-api';

export default function FriendSearch({ user }) {

    let [users, setUsers] = useState({});
    let [searchInput, setSearchInput] = useState('');
    let [foundUser, setFoundUser] = useState(null);
    let [searchError, setSearchError] = useState('Search for new Friends!')


    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    useEffect(function () {
        async function getUsers() {
            try {
                const users = await friendListAPI.getAll({});
                setUsers(users);
            } catch (error) {
                console.error('Error Fetching Questions', error);
            }
        }
        getUsers();
    }, []);


    function findUser(string, users) {
        const lowerCaseString = string.toLowerCase();

        const foundUser = users.find((user) => user.user.name.toLowerCase() === lowerCaseString);

        if (foundUser && foundUser.user.name === user.name) {
            setSearchError(`You can't friend request yourself`);
            setFoundUser(null);
        } else if (foundUser) {
            setFoundUser({
                ID: foundUser.user._id,
                username: foundUser.user.name
            });
            setSearchError('You found a friend!');
        } else {
            setFoundUser(null);
            setSearchError('No users found with that name');
        }
    };


    async function handleSendFriendRequest() {
        try {
            await friendListAPI.sendFriendRequest({ friendID: foundUser.ID, friendName: foundUser.username });
            setSearchInput('');
            setFoundUser(null);
            setSearchError('Friend Request Sent!');

        } catch (error) {
            console.error('error creating note'.error)
        }

    }


    return (
        <div className='FriendSearch'>
            <h3>Search for Friends</h3>

            <div className='SearchDiv'>
                <input type="text"
                    placeholder='user'
                    value={searchInput}
                    onChange={handleInputChange} />
                <button className='SearchButton' onClick={() => findUser(searchInput, users)}>Search User</button>
            </div>

            {foundUser && <div className='FoundUser'>
                <h3>{foundUser.username}</h3>
                <button className='SearchButton' onClick={handleSendFriendRequest}>Send Request</button>
            </div>}
            <p className='SearchResult'>{searchError}</p>
        </div>
    )
}