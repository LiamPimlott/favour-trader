import React, { Component } from 'react';

import './NotFound.css';

class NotFound extends Component {

  render() {
    return (
      <div className='NotFound-text'>
        <h1>
          <p>Oops!</p>
        </h1>
        <div>
          <b>The page you're looking for does not exist :(</b>
        </div>
      </div>
    );
  }
}

export default NotFound;
