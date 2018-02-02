import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            welcomeMessage: null
        }
    }
  
  componentDidMount() {
      fetch('/users')
          .then(res => res.json())
          .then(data => this.setState({ welcomeMessage: data.firstRequest}));
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
