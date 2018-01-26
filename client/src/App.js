import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {welcomeMessage: []}
  
  componentDidMount() {
    fetch('/')
      .then(res => res.json())
      .then(welcomeMessage => this.setState({ welcomeMessage }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to FavourTrader</h1>
        </header>
        <p className="App-intro">
          {this.state.welcomeMessage}
        </p>
      </div>
    );
  }
}

export default App;
