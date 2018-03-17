import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from '../pages/Main.js';
import CreateAccount from '../pages/CreateAccount.js';
import NotFound from '../pages/NotFound.js';
import Profile from '../pages/Profile.js';
import Trades from '../pages/Trades.js';
import Login from '../pages/Login.js';
import FilterHas from '../pages/FilterHas.js';
import FilterWants from '../pages/FilterWants.js';
import Contract from '../pages/Contract';

class RouteRenderer extends Component {

  redirectToLogin() {
    return (<Redirect to={'/login'}/>);
  }

  render() {
    const { authService } = this.props;
    return (
      (authService.loggedIn()) ? (
        <Switch>
          <Route exact path='/' render={(routeProps) => (<Main {...routeProps} {...this.props}/>)}/>
          <Route exact path='/filterHas' render={(routeProps) => (<FilterHas {...routeProps} {...this.props}/>)}/>
          <Route exact path='/filterWants' render={(routeProps) => (<FilterWants {...routeProps} {...this.props}/>)}/>
          <Route exact path='/profile' component={(routeProps) => (<Profile {...routeProps} {...this.props}/>)}/>
          <Route path='/profile/:userId' component={(routeProps) => (<Profile {...routeProps} {...this.props}/>)}/>
          <Route exact path='/trades' component={(routeProps) => (<Trades {...routeProps} {...this.props}/>)}/>
          <Route exact path='/trades/:source' component={(routeProps) => (<Trades {...routeProps} {...this.props}/>)}/>
          <Route exact path='/trades/:source/:tradeID' component={(routeProps) => (<Contract {...routeProps} {...this.props}/>)}/>
          <Route path='/login' render={(routeProps) => (<Login {...routeProps} {...this.props} />)}/>
          <Route path='/create-account' render={(routeProps) => (<CreateAccount {...routeProps} {...this.props} />)}/>         
          <Route path='*' component={NotFound}/>
        </Switch>
      ) : (
        <Switch>
          <Route path='/create-account' render={(routeProps) => (<CreateAccount {...routeProps} {...this.props} />)}/>
          <Route path='/login' render={(routeProps) => (<Login {...routeProps} {...this.props} />)}/>
          <Route path='*' render={() => this.redirectToLogin()}/>
        </Switch>
      )
    );
  }
}

export default RouteRenderer;
