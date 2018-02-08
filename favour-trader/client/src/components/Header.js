import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
class Header extends Component {
  render() {
    const { toggleSideMenu } = this.props;

    return (
      <div className={'Header'}>
        <div>
          <button className={'btn'} onClick={toggleSideMenu}>Toggle Menu</button>
        </div>
        <div>
          *PRETEND PLACEHOLDER NAVBAR*:
          <Link to="/"> Home</Link>
          <Link to="/create-account"> Create Account </Link>
          <Link to="/login">Login </Link>
          <Link to="/profile"> Profile</Link>
        </div>
      </div>
    );
  }
}

export default Header;
