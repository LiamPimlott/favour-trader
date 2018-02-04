import React, { Component } from 'react';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      welcomeMessage: null
    }
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(data => this.setState({ welcomeMessage: data.firstRequest }));
  }

  render() {
    return (
      <div>
        <header>
          <h1>Welcome to FavourTrader</h1>
        </header>
        <p>
          {this.state.welcomeMessage}
        </p>
      </div>
    );
  }
}

export default Landing;
