import React, {Component} from 'react';
import RouteRenderer from './components/RouteRenderer.js';
import SidePanel from './components/SidePanel.js';
import AuthService from './components/AuthService.js';
import { Link } from 'react-router-dom';
import './App.css';
import {Menu, Icon, Layout} from 'antd';
const {Header, Content, Sider} = Layout;

class App extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: true,
            current: '',
        };
        this.toggleSideMenu = this.toggleSideMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.authService = new AuthService();
    }

    handleClick = (e) => {
        this.setState({
            current: e.keyPath[0],
        });
        if (e.key === 'logout') {
            this.authService.logout();
        }
    };

    toggleSideMenu() {
        this.setState({
            collapsed: !this.state.collapsed,
        });

    }

    renderNavToggler (loggedIn) {
        if (loggedIn) {
            return (
                <Menu mode={'horizontal'}
                      theme={'light'}
                      style={{float: 'left'}}>
                    <Menu.Item>
                        <Icon className={'trigger'}
                              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                              onClick={this.toggleSideMenu}/>
                    </Menu.Item>
                </Menu>
            );
        } else {
            return ('');
        }
    }

    renderMenuItems (loggedIn) {
        if (loggedIn) {
            return (
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    theme={'light'}
                    style={{float: 'right'}}
                >

                    <Menu.Item key="logout">
                        <Icon type="logout"/>Log out
                    </Menu.Item>
                </Menu>
            );
        } else {
            return (
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    theme={'light'}
                    style={{float: 'right'}}
                >

                    <Menu.Item key="create-account" id={'create-account'}>
                        <Link to="/create-account" className="nav-text">
                            <Icon type="user-add" /> <span>Sign Up</span>
                        </Link>

                    </Menu.Item>

                    <Menu.Item key="login" className={'login'}>
                        <Link to="/login">
                            <Icon type="user"/> <span>Sign in</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            );
        }
    }

    render() {
        return (
            <Layout style={{height:"100vh"}}>
                <Header>
                    {
                        this.renderNavToggler(this.authService.loggedIn())
                    }
                    <h4>Favor <Icon type={'swap'}/> Trader</h4>
                    {
                        this.renderMenuItems(this.authService.loggedIn())
                    }
                </Header>
                <Layout style={{background: '#fff'}}>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        style={{ background: '#ffffff', padding: 0 }}

                    >
                        <SidePanel isVisible={this.state.collapsed}  authService={this.authService}/>
                    </Sider>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <RouteRenderer authService={this.authService}/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default App;
