import React, {Component} from 'react';
import RouteRenderer from './components/RouteRenderer.js';
import SidePanel from './components/SidePanel.js';
import AuthService from './components/AuthService.js';
import './App.css';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';


class App extends Component {
    constructor() {
        super();
        this.state = {
            sideMenuOpen: false,
        };

        this.toggleSideMenu = this.toggleSideMenu.bind(this);
        this.authService = new AuthService();
    }

    toggleSideMenu() {
        this.setState({
            sideMenuOpen: !this.state.sideMenuOpen,
        });
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md" className={'fixed-top'}>
                    <button className={(this.authService.loggedIn()) ? ('btn btn-link') : ('btn btn-link d-none')}
                            onClick={this.toggleSideMenu} aria-pressed="false">
                        <i className="fas fa-align-justify fa-3x"></i>
                    </button>
                    <NavbarBrand href="/">favourTrader</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    {
                        (!this.authService.loggedIn()) ? (
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/create-account">Sign Up</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/login">Login</NavLink>
                                </NavItem>
                            </Nav>
                        ) : (
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/Profile">Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={this.authService.logout} href="/">Signout</NavLink>
                                </NavItem>
                            </Nav>
                        )
                    }
                </Navbar>

                <div className={'container app-body text-center'}>
                    <div className={(this.state.sideMenuOpen) ? ('SideMenu-wrapper') : ('SideMenu-closed')}>
                        <SidePanel isVisible={this.state.sideMenuOpen} authService={this.authService}/>
                    </div>
                    <RouteRenderer authService={this.authService}/>
                </div>
            </div>
        );
    }
}

export default App;
