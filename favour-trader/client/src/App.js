import React, { Component } from 'react';
import Header from './components/Header.js';
import RouteRenderer from './components/RouteRenderer.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <RouteRenderer />
      </div>
    );
  }
}

export default App;
