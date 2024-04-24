import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../../utilities/user-services'
import AuthPage from '../Auth/AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import './App.css';
import Client from '../Client/Client';
import Sauce from '../Sauce/Sauce';


function App() {
  const [user, setUser] = useState(getUser())

  return (
    <div className='App'>
      {user ?
        <>
          <Routes>
            <Route path='/' element={<HomePage user={user} setUser={setUser} />} />
            <Route path='/client' element={<Client user={user} />} />
          </Routes>
        </> :
        <AuthPage setUser={setUser} />
        // <Sauce />
      }
    </div>
  )
}

export default App
