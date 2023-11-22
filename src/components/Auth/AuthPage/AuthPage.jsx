import { useState } from 'react'
import SignUpForm from '../SignUpForm/SignUpForm'
import LoginForm from '../LoginForm/LoginForm'
import Hotel from '../../../assets/images/landing/Homepage.png'
import './AuthPage.css';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false)
  return (
    <>


      {showSignUp ?
        <SignUpForm setUser={setUser} />
        :
        <LoginForm setUser={setUser} />
      }

      <h1 className='AuthPageTitle'>Habbo Hotel... Bet, Scam, and get angry!</h1>
      <div className='HomePageDiv'>
        <button className='JoinButton'>Join now for Free</button>
      </div>
      <button className='GoAway' onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
      {/* <img src={Hotel} /> */}
    </>
  );
}