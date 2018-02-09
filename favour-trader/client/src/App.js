import React, { Component } from 'react';
import Header from './components/Header.js';
import RouteRenderer from './components/RouteRenderer.js';
import SidePanel from './components/SidePanel.js';
import AuthService from './components/AuthService.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sideMenuOpen: false,
    };

    this.toggleSideMenu = this.toggleSideMenu.bind(this);
    this.Auth = new AuthService();
  }

  toggleSideMenu() {
    this.setState({
      sideMenuOpen: !this.state.sideMenuOpen,
    });
  }

  render() {
    return (
      <div className={'App'}>
        <div className={'Nav-wrapper'}>
          <Header toggleSideMenu={this.toggleSideMenu}/>
        </div>
        <div className={'SideMenu-wrapper'}>
          <SidePanel isVisible={this.state.sideMenuOpen}/>
        </div>
        <div className={'PageContent-wrapper'}>
          <RouteRenderer authService={this.Auth}/>
        </div>
      </div>
    );
  }
}

export default App;
