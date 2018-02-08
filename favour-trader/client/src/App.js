import React, { Component } from 'react';
import Header from './components/Header.js';
import RouteRenderer from './components/RouteRenderer.js';
import SidePanel from './components/SidePanel.js';
import './App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  
class App extends Component {
  constructor() {
    super();
    this.state = {
      sideMenuOpen: false,
    };

    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  toggleSideMenu() {
    this.setState({
      sideMenuOpen: !this.state.sideMenuOpen,
    });
  }

  render() {
    return (
	
      <div className={'App'}>
	  
		<Navbar color="dark" dark expand="md">
		
			<NavbarBrand href="/">favourTrader</NavbarBrand>
			
			<NavbarToggler onClick={this.toggle} />
			<Nav className="ml-auto" navbar>
				<NavItem>
					<NavLink href="/">Home</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/Profile">Profile</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/create-account">Sign Up</NavLink>
				</NavItem>
				<NavItem>
						<NavLink href="/login">Login</NavLink>					
				</NavItem>
				<NavItem>
					<NavLink href="/">Signout</NavLink>
				</NavItem>
			</Nav>
		</Navbar>

		
        <div className={'Nav-wrapper'}>
          <Header toggleSideMenu={this.toggleSideMenu}/>
        </div>
        <div className={'SideMenu-wrapper'}>
          <SidePanel isVisible={this.state.sideMenuOpen}/>
        </div>
        <div className={'PageContent-wrapper'}> 
           <RouteRenderer />
        </div>
      </div>
    );
  }
}

export default App;
