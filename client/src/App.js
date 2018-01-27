import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
    constructor(){
        super()
        this.state = {
            welcomeMessage: null
        }
    }
  
  componentDidMount() {
    axios.get('http://localhost:3001/')
        .then(res => {
            console.log(res.data);
            var welcomeMessage = res.data.firstRequest;
            this.setState({ welcomeMessage: welcomeMessage });
        });
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
