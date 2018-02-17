import React, {Component} from 'react';
import RouteRenderer from './components/RouteRenderer.js';
import SidePanel from './components/SidePanel.js';
import AuthService from './components/AuthService.js';
import {Redirect} from 'react-router-dom';
import './App.css';
import {Menu, Icon, Layout} from 'antd';

const {Header, Content, Sider, Footer} = Layout;

class App extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: true,
            current: 'login'
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
        console.log(this.state.collapsed);
        this.setState({
            collapsed: !this.state.collapsed,
        });

    }

    render() {
        return (
                <Layout style={{height:"100vh"}}>
                    {
                        (this.state.current === 'create-account' &&
                            window.location.pathname !== '/create-account') ? (<Redirect to={'/create-account'}/>) : ('')
                    }
                    {
                        (this.state.current === 'login' &&
                            window.location.pathname !== '/login') ? (<Redirect to={'/login'}/>) : ('')
                    }
                    {
                        (this.state.current === 'logout' &&
                            window.location.pathname !== '/') ? (<Redirect to={'/'}/>) : ('')
                    }
                    <Header style={{ background: '#fff', padding: 0 }}>

                        {
                            (!this.authService.loggedIn()) ? (
                                <Menu
                                    onClick={this.handleClick}
                                    selectedKeys={[this.state.current]}
                                    mode="horizontal"
                                    theme={'light'}
                                >
                                    <Menu.Item key="create-account" id={'create-account'}>
                                        <Icon type="user-add"/>Sign Up
                                    </Menu.Item>

                                    <Menu.Item key="login" className={'login'}>
                                        <Icon type="user"/>Sign In
                                    </Menu.Item>
                                </Menu>
                            ) : (
                                <Menu
                                    onClick={this.handleClick}
                                    selectedKeys={[this.state.current]}
                                    mode="horizontal"
                                    theme={'light'}
                                >
                                    <Menu.Item id={'menu-1'}>
                                        <Icon className={'trigger'}
                                              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                              onClick={this.toggleSideMenu}/>
                                    </Menu.Item>
                                    <Menu.Item key="logout">
                                        <Icon type="logout"/>Log out
                                    </Menu.Item>
                                </Menu>
                            )
                        }

                    </Header>

                    <Content style={{ padding: '50px 50px', height: '100vh'}}>
                        <Layout style={{ padding: '24px 0', background: '#fffff' }}>
                            <Sider
                                trigger={null}
                                collapsible
                                collapsed={this.state.collapsed}
                                style={{ background: '#fff', padding: 0 }}
                            >
                                <div className="logo"/>
                                <Menu theme="light"
                                      mode="inline"
                                      defaultSelectedKeys={['1']}
                                      style={{ height: '100%' }}>
                                    <Menu.Item key="1">
                                        <Icon type="user"/>
                                        <span>nav 1</span>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Icon type="video-camera"/>
                                        <span>nav 2</span>
                                    </Menu.Item>
                                    <Menu.Item key="3">
                                        <Icon type="upload"/>
                                        <span>nav 3</span>
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                            <Content>
                                <div className={'container app-body text-center'}>
                                    <div className={(this.state.sideMenuOpen) ? ('SideMenu-wrapper') : ('SideMenu-closed')}>
                                        <SidePanel isVisible={this.state.sideMenuOpen} authService={this.authService}/>
                                    </div>
                                    <RouteRenderer authService={this.authService}/>
                                </div>
                            </Content>
                        </Layout>

                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Favor Trader ©2018 Created by Group 8
                    </Footer>
                </Layout>




        );
    }
}

export default App;
