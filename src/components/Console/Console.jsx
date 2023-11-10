import './Console.css';
import { useState } from 'react';
import ConsoleProfile from '../ConsoleProfile/ConsoleProfile';
import ConsoleFriends from '../ConsoleFriends/ConsoleFriends';
import FriendRequests from '../FriendRequests/FriendRequests';
import FriendSearch from '../FriendSearch/FriendSearch';

export default function Console({ user, consoleDiv, setConsoleDiv }) {

    const [selectedTab, setSelectedTab] = useState('ConsoleProfile');

    function closeConsole() {
        setConsoleDiv(!consoleDiv);
    }

    function handleTabClick(componentName) {
        setSelectedTab(componentName);
    };



    return (
        <div className='Console'>
            <h3>Habbo Console</h3>
            <button onClick={closeConsole} className='ConsoleX'>X</button>
            <div className='ConsoleScreen'>

                {selectedTab === 'ConsoleProfile' && <ConsoleProfile user={user} />}
                {selectedTab === 'ConsoleFriends' && <ConsoleFriends user={user} />}
                {selectedTab === 'FriendRequests' && <FriendRequests user={user} />}
                {selectedTab === 'FriendSearch' && <FriendSearch user={user} />}

            </div>
            <ul className='ConsoleNav'>
                <li>
                    <div
                        onClick={() => handleTabClick('ConsoleProfile')}
                        className={selectedTab === 'ConsoleProfile' ? 'ActiveTab' : ''}
                    >
                        My Info
                    </div>
                </li>
                <li>
                    <div
                        onClick={() => handleTabClick('ConsoleFriends')}
                        className={selectedTab === 'ConsoleFriends' ? 'ActiveTab' : ''}
                    >
                        Friends
                    </div>
                </li>
                <li>
                    <div
                        onClick={() => handleTabClick('FriendRequests')}
                        className={selectedTab === 'FriendRequests' ? 'ActiveTab' : ''}
                    >
                        Requests
                    </div>
                </li>
                <li>
                    <div
                        onClick={() => handleTabClick('FriendSearch')}
                        className={selectedTab === 'FriendSearch' ? 'ActiveTab' : ''}
                    >
                        Search
                    </div>
                </li>
            </ul>
        </div>
    )
}