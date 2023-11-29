import { useState } from 'react'
import SignUpForm from '../SignUpForm/SignUpForm'
import LoginForm from '../LoginForm/LoginForm'
import './AuthPage.css';

export default function AuthPage({ setUser }) {

  const [signUpDiv, setSignUpDiv] = useState(false);

  function toggleSignUp() {
    setSignUpDiv(!signUpDiv)
  }

  return (
    <>


      <LoginForm setUser={setUser} />


      {signUpDiv && <SignUpForm setUser={setUser} />}
      <h1 className='AuthPageTitle'>Ghotel... Build Casinos, Scam, & Profit.</h1>
      <div className='HomePageDiv'>
        <div className='JoinDiv'>
          <p>New to Ghotel?<span> Click here to</span></p>
          <button onClick={toggleSignUp} className='JoinButton'>
            {signUpDiv ? 'Nevermind! STOP!!' : 'Join now for Free'}
          </button>
        </div>
      </div>

      <ul className='AuthList'>
        <li>Created by Greg Mattia</li>
        <li><a className='underline' href='https://docs.google.com/document/d/1N5zmfwLDI_Z3wRA72dflyadcNCkvl4b-/edit?usp=sharing&ouid=115131069856658862221&rtpof=true&sd=true' target="_blank">Resume</a></li>
        <li><a className='underline' href='https://github.com/GJMattia' target="_blank">Github</a></li>
        <li><a className='underline' href='https://www.linkedin.com/in/greg-mattia/' target="_blank">LinkedIn</a></li>
        <li>Powered by React.JS</li>
      </ul>
      <p className='AuthDisclaimer'>This is a MERN stack application. A recreation of Habbo Hotel created by Greg Mattia. Made completely from scratch with the exception of borrowing some image assets that I found online.
        The basis of this project was to recreate a classic game and hone my skills in the software engineering field. No rights reserved. GM - 2023</p>
    </>
  );
}