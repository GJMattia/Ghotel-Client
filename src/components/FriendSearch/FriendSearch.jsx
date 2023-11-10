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

        const foundUser = users.find((user) => user.user.name === string);

        if (foundUser) {
            setFoundUser({
                ID: foundUser.user._id,
                username: foundUser.user.name
            });
            setSearchError('You found a friend!')
        } else {
            setFoundUser(null);
            setSearchError('No Users found with that name')
        }
    }

    async function handleSendFriendRequest() {
        try {
            await friendListAPI.sendFriendRequest({ friendID: foundUser.ID })
        } catch (error) {
            console.error('error creating note'.error)
        }
    }


    return (
        <div className='FriendSearch'>
            <h1>Search for Friends</h1>
            <input type="text"
                value={searchInput}
                onChange={handleInputChange} />
            <button onClick={() => findUser(searchInput, users)}>Search</button>

            {foundUser && <div className='FoundUser'>
                <h1>{foundUser.username}</h1>
                <p>{foundUser.ID}</p>
                <button onClick={handleSendFriendRequest}>Friend Request</button>
            </div>}

            <p>{searchError}</p>

        </div>
    )
}