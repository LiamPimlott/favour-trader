import React, { Component } from 'react';
import { Fade } from "reactstrap";
import { Redirect } from 'react-router-dom';

import {Card,  Form, Icon, Input, Button } from 'antd';
import './Login.css';
const FormItem = Form.Item;

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            redirect: false,
            failedAttempt: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.renderErrorText = this.renderErrorText.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        const { authService } = this.props;
        if (authService.loggedIn()) {
            this.setState({
                redirect: true,
            });
        }
    }

    submit() {
        const {authService} = this.props;
        authService.login(this.state.email, this.state.password)
            .then(res => {
                if (res.success && res.token) {
                    this.setState({
                        redirect: true,
                    });
                } else {
                    this.setState({
                        failedAttempt: true,
                    });
                }
            })
            .catch(err => {
                alert(err);
            });
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    renderErrorText() {
        return (
            <Fade className={'center'}>You have entered an invalid email address or password.</Fade>
        );
    }

    render() {
        const title = <h5>Favor <Icon type={'swap'}/> Trader</h5>;
        return (
            <div className={'container'}>
                {
                    (this.state.redirect) ? (<Redirect to={'/'}/>) : ('')
                }
                <Card title={title} bordered={true} className={'login-form-card'}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        {
                            (this.state.failedAttempt) ? (this.renderErrorText()) : ('')
                        }
                        <FormItem>
                                <Input
                                    prefix={<Icon type="user"
                                    style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email Address"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    type="email" name="email"
                                    id="email" />
                        </FormItem>
                        <FormItem>
                                <Input prefix={<Icon type="lock"
                                       style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       value={this.state.password}
                                       onChange={this.handleChange}
                                       type="password"
                                       name="password"
                                       id="password"
                                       placeholder="Password" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit"  onClick={this.submit} className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Login;