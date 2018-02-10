import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../pages/Main.js';
import CreateAccount from '../pages/CreateAccount.js';
import NotFound from '../pages/NotFound.js';
import Profile from '../pages/Profile.js';
import Login from '../pages/Login.js';

class RouteRenderer extends Component {
  insertAuth(routeProps, extraProps) {
    return (<Login {...routeProps} {...extraProps} />);
  }

  render() {
    const { authService } = this.props;
    
    return (
      (authService.loggedIn()) ? (
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/create-account' component={CreateAccount}/>
          <Route exact path='/profile' component={Profile}/>
          <Route path='/login' render={(routeProps) => this.insertAuth(routeProps, this.props)}/>
          <Route path='*' component={NotFound}/>
        </Switch>
      ) : (
        <Switch>
          <Route path='/create-account' component={CreateAccount}/>
          <Route path='*' render={(routeProps) => this.insertAuth(routeProps, this.props)}/>
        </Switch>
      )
    );
  }
}

export default RouteRenderer;
