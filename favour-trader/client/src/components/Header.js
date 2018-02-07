import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className={'Header'}>
        <div className={'PretendNavbar'}>
          Put a navbar up here! 
          <Link to="/"> Home</Link>
          <Link to="/create-account"> Create Account</Link>
          <Link to="/profile"> Profile</Link>
        </div>
      </div>
    );
  }
}

export default Header;
