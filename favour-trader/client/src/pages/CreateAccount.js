import React, { Component } from 'react';
import './CreateAccount.css';
import { Redirect } from 'react-router-dom';
import { Card, Form, Icon, Input, Button, message } from 'antd';
const FormItem = Form.Item;


class CreateAccount extends Component {
    constructor(){
        super();
        this.state = {
            redirect: false,
            failedAttempt: false,
            iconLoading: false,
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
        const { authService } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                authService.signup(
                    values.firstName,
                    values.lastName,
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
                        message.error(err.message);
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
        const title = <div><h5>Hone your Skills,</h5> <p>Get Started, its free!</p></div>;
        return (
            <div className={'container'}>
                {
                    (this.state.redirect) ? (<Redirect to={'/Profile'}/>) : ('')
                }
                <Card bordered title={title} className={'signup-form-card'}>
                    <Form className={'signup-form'}>
                        <FormItem>
                            {
                                getFieldDecorator('firstName', {
                                    rules: [{ required: true, message: 'Please input your first name!' },
                                            { min: 2, message: 'First name is too short!'}],
                                    validateTrigger: 'onBlur'
                                })
                                (
                                <Input type="text"
                                       name="firstName"
                                       id="firstName"
                                       placeholder=" First Name"
                                       prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('lastName', {
                                    rules: [{ required: true, message: 'Please input your last name!' },
                                            { min: 2, message: 'Last name is too short!'}],
                                    validateTrigger: 'onBlur'
                                })
                                (
                                <Input type="text"
                                       name="lastName"
                                       id="lastName"
                                       placeholder=" Last Name"
                                       prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('emailAddress', {
                                    rules: [{ required: true, message: 'Please input your E-mail address!'},
                                        {type: 'email', message: 'The input is not valid E-mail!'}],
                                    validateTrigger: 'onBlur'
                                })
                                (
                                <Input type="email"
                                       name="email"
                                       id="email"
                                       placeholder=" Email Address"
                                       prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your password!' }],
                                    validateTrigger: 'onBlur'
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
                        <Button type={'primary'} onClick={this.submit} loading={this.state.iconLoading} className={'signup-form-button'} >Submit</Button>
                        <p className={'user-agreement'}>By signing up, you agree to our <br/> <a href="#">User Agreement</a></p>
                    </Form>
                </Card>
            </div>
        );
    }
}
const WrappedRegistrationForm = Form.create()(CreateAccount);
export default WrappedRegistrationForm;