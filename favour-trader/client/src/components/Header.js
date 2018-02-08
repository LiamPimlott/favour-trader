import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    const { toggleSideMenu } = this.props;

    return (
      <div className={'Header'}>
        <div>
          <button className={'btn'} onClick={toggleSideMenu} aria-pressed="false">Toggle Menu</button>
        </div>
      </div>
    );
  }
}

export default Header;
