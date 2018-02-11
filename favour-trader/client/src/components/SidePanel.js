import React, { Component } from 'react';
import Dock from 'react-dock';
import SidePanelContent from './SidePanelContent';

class SidePanel extends Component {
  render() {
    const { isVisible, authService } = this.props;
    const dockStyle = {
      width: '0px',
      marginTop: '55px',
      backgroundColor: '#9978C2',
      overflow: 'hidden',
    };

    return (
      <Dock size={0.2} position='left' isVisible={isVisible} dimMode={'none'} dockStyle={dockStyle}>
      {
        (authService.loggedIn()) ? (
          <SidePanelContent authService={authService}/>
        ) : (
          ''
        )
      }
      </Dock>
    );
  }
}

export default SidePanel;