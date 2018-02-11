import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    const { toggleSideMenu, authService } = this.props;

    return (
      <div className={'Header'}>
      {
        (authService.loggedIn()) ? (
          <button className={'btn'} onClick={toggleSideMenu} aria-pressed="false">Toggle Menu</button>
        ) : (
          ''
        )
      }
      </div>
    );
  }
}

export default Header;
