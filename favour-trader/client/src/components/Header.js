import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to FavourTrader</h1>
        </header>
        <div>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/create-account">Create Account</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
