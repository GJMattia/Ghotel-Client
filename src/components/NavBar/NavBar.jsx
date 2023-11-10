import { Link } from 'react-router-dom'
import * as userService from '../../../utilities/user-services'
import './NavBar.css'

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut()
    setUser(null)
  }

  return (
    <ul className='NavBar'>
      <li><Link to='/'>Main Page</Link></li>

      <li><Link to='/profile'>Profile</Link></li>
      <li><Link to='' onClick={handleLogOut}>Log Out</Link></li>

    </ul>
  );
}