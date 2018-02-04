import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../pages/Landing.js';
import CreateAccount from '../pages/CreateAccount.js';
import NotFound from '../pages/NotFound.js';

class RouteRenderer extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/account' component={CreateAccount}/>
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default RouteRenderer;
