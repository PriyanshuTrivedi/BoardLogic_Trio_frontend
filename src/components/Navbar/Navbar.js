import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  console.log(localStorage);
  const username=localStorage.getItem('u-username');
  console.log(username);
  const navigate=useNavigate();
  const Logout=()=>{
    localStorage.clear();
    navigate('/');
  }
  return (
    <div className='mainNavbar'>
      <div className="leftSide">
        <div className="nameHeading">BoardLogic Trio</div>
        <Link className='NavbarLinks leftLinks' to={'/About'}>
          <div className="about">About</div>
        </Link>
        <Link className='NavbarLinks leftLinks' to={'/Leaderboard'}>
          <div className="about">LeaderBoard</div>
        </Link>
      </div>
      <div className="rightSide">
        {
          username?
          <div className="NavbarLogout" onClick={Logout}>Logout</div>
          :
          <Link className='NavbarLinks' to={'/signup_login'}>
            <div className="signUpLoginInNavbar">Login</div>
          </Link>
        }
        
      </div>
    </div>
  )
}

export default Navbar
