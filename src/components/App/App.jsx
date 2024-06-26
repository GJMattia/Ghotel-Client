import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../../utilities/user-services'
import AuthPage from '../Auth/AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import './App.css';
import Client from '../Client/Client';
import CreateAccount from '../CreateAccount/CreateAccount';


function App() {
  const [user, setUser] = useState(getUser())
  return (
    <div className='App'>
      {user ?
        <>
          <Routes>
            <Route path='/' element={<HomePage user={user} setUser={setUser} />} />
            <Route path='/client' element={<Client user={user} />} />
            <Route path='/signup' element={<HomePage user={user} setUser={setUser} />} />
          </Routes>
        </> :
        <Routes>
          <Route path='/' element={<AuthPage setUser={setUser} />} />
          <Route path='/client' element={<AuthPage setUser={setUser} />} />
          <Route path='/signup' element={<CreateAccount setUser={setUser} />} />
        </Routes>
      }
    </div>
  )
}

export default App
