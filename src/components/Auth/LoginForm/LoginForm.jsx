import './LoginForm.css';
import { useState } from 'react';
import * as usersService from '../../../../utilities/user-services';
import Ghotel from '../../../assets/images/landing/GhotelLogo.gif';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
    setError('')
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    try {
      const user = await usersService.login(credentials)
      setUser(user)
    } catch {
      setError('Log In Failed - Try Again')
    }
  }

  return (
    <div className='LoginFormDiv'>
      <img className='GhotelLogo' src={Ghotel} />
      <form className='LoginForm' autoComplete="off" onSubmit={handleSubmit}>
        <div className="LoginSections">
          <label>Email</label>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
        </div>
        <div className="LoginSections">
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        <button className='LoginButton' type="submit">Login</button>
      </form >

      {error ? <h2 className="LogError">{error}</h2> : null}

    </div >
  )
}