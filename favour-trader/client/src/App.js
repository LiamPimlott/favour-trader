import React, {Component} from 'react';
import RouteRenderer from './components/RouteRenderer.js';
import SidePanel from './components/SidePanel.js';
import AuthService from './components/AuthService.js';
import {Redirect} from 'react-router-dom';
import './App.css';
import {Menu, Icon, Layout, Anchor} from 'antd';
const { Link } = Anchor;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const {Header, Content, Sider, Footer} = Layout;

class App extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: true,
            current: 'login',
            openKeys: [],
        };
        this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
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

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

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
                                        <Icon type="user"/> Log In
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

                    <Layout>

                        <Sider
                            trigger={null}
                            collapsible
                            collapsed={this.state.collapsed}
                            style={{ background: '#ffffff', padding: 0 }}

                        >
                            <Menu theme="light"
                                  mode="inline"
                                  openKeys={this.state.openKeys}
                                  onOpenChange={this.onOpenChange}
                                  style={{ height: '100%'}}>
                                <SubMenu key="sub1" disabled={(this.authService.loggedIn()) ? (false) : (true)} title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                                        <Menu.Item key="1">Option 1</Menu.Item>
                                        <Menu.Item key="2">Option 2</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" disabled={(this.authService.loggedIn()) ? (false) : (true)} title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                                    <Menu.Item key="5">Option 5</Menu.Item>
                                    <Menu.Item key="6">Option 6</Menu.Item>
                                </SubMenu>
                            </Menu>
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
