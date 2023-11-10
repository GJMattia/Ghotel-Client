import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../../utilities/user-services'
import AuthPage from '../Auth/AuthPage/AuthPage'
import NavBar from '../NavBar/NavBar'
import MainPage from '../MainPage/MainPage'
import './App.css'
import ProfilePage from '../ProfilePage/ProfilePage'
import Client from '../Client/Client'

function App() {
  const [user, setUser] = useState(getUser())

  return (
    <div className='App'>
      {user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path='/' element={<MainPage user={user} />} />
            <Route path='/profile' element={<ProfilePage user={user} />} />
            <Route path='/client' element={<Client user={user} />} />
          </Routes>
        </> :
        <AuthPage setUser={setUser} />
      }
    </div>
  )
}

export default App
