import React, { Component } from 'react';
import ContractModal from '../components/ContractModal.js';
import axios from 'axios'

class Main extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      selectedUser: {},
      modalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
  }

  componentDidMount() {
    axios.get('/api/users/all')
      .then(res => res.data)
      .then(data => this.setState({ users: data }));
  }

  toggleModal(user) {
    this.setState({
      selectedUser: user,
      modalOpen: !this.state.modalOpen,
    });
  }

  renderUsers(users) {
    return (
      <div>
      {
        (users) ? (
          <ul>
          {
            users.map(function(user) {
              return (<li key={user._id} onClick={this.toggleModal.bind(this, user)}> {user.email} </li>)
            }, this)
          }
          </ul>
        ) : (
          ''
        )
      }
      </div>
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
        <ContractModal isOpen={this.state.modalOpen} toggle={this.toggleModal.bind(this, {})} user={this.state.selectedUser}/>
      </div>
    );
  }
}

export default Main;
