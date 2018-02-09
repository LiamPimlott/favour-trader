import React, { Component } from 'react';
import axios from 'axios'
class Main extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios.get('/api/users/all')
      .then(res => res.data)
      .then(data => this.setState({ users: data }));
  }

  renderUsers(users) {
    return (
      <ul>
      {
        users.map(function(user) {
          return (<li key={user._id}> {user.email} </li>)
        })
      }
      </ul>
    );

  }

  render() {
    return (
      <div>
        <header>
          <h1>Welcome to FavourTrader</h1>
        </header>
        <div>
          {this.renderUsers(this.state.users)}
        </div>
      </div>
    );
  }
}

export default Main;
