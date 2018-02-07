import React, { Component } from 'react';
import Header from './components/Header.js';
import RouteRenderer from './components/RouteRenderer.js';
import SideMenu from './components/SideMenu.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className={'App'}>
        <div className={'Nav-wrapper'}>
          <Header />
        </div>
        <div className={'SideMenu-wrapper'}>
          <SideMenu />
        </div>
        <div className={'PageContent-wrapper'}>
          <RouteRenderer />
        </div>
      </div>
    );
  }
}

export default App;
