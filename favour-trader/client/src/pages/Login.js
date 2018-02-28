import React, { Component } from 'react';
import { Fade } from "reactstrap";
import { Redirect } from 'react-router-dom';
import {Card,  Form, Icon, Input, Button } from 'antd';
import './Login.css';
import {message} from "antd/lib/index";
const FormItem = Form.Item;

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            redirect: false,
            failedAttempt: false,
            iconLoading: false,
        };

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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                authService.login(
                    values.emailAddress,
                    values.password,
                    )
                    .then(res => {
                        if (res.success && res.token) {
                            this.setState({
                                redirect: true,
                            });
                        } else {
                            this.setState({
                                failedAttempt: true,
                                iconLoading: true
                            });
                            if(this.state.failedAttempt){
                                this.renderErrorText(res.message);
                            }
                        }
                    })
                    .catch(err => {
                        alert(err);
                    });
            }
        })

    }

    renderErrorText(err) {
        return (
            message.error(err, 2 , ()=> {
                this.setState({
                    iconLoading: false
                });
            })
        );
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const title = <h5>Favor <Icon type={'swap'}/> Trader</h5>;
        return (
            <div className={'container'}>
                {
                    (this.state.redirect) ? (<Redirect to={'/'}/>) : ('')
                }
                <Card title={title} bordered={true} className={'login-form-card'}>
                    <Form className="login-form">
                        <FormItem>
                            {
                                getFieldDecorator('emailAddress', {
                                    rules: [{ required: true, message: 'Please input your E-mail address!' },
                                            {type: 'email', message: 'The input is not valid E-mail!'}],
                                    validateTrigger: 'onBlur'
                                })
                                (
                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email Address"
                                    type="email"
                                    name="email"
                                    id="email" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your password!' }],
                                    validateTrigger: 'onBlur',
                                })
                                (
                                    <Input type="password"
                                           name="password"
                                           id="password"
                                           placeholder=" Password"
                                           prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit"
                                    onClick={this.submit} loading={this.state.iconLoading}  className="login-form-button">
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

const WrappedLoginForm = Form.create()(Login);
export default WrappedLoginForm;