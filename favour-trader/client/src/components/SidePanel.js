import React, { Component } from 'react';
import SidePanelContent from './SidePanelContent';

class SidePanel extends Component {
  render() {
    const {authService } = this.props;

    return (
        <div>
      {
        (authService.loggedIn()) ? (
          <SidePanelContent authService={authService}/>
        ) : (
          ''
        )
      }
        </div>
    );
  }
}

export default SidePanel;