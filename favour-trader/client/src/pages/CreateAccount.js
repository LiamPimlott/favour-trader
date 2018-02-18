import React, { Component } from 'react';
import {Fade} from 'reactstrap';
import './CreateAccount.css';
import { Redirect } from 'react-router-dom';
import { Card, Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class CreateAccount extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            postalCode: "",
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
        const { authService } = this.props;
        authService.signup(
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.password,
            this.state.postalCode,
        )
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

    renderErrorText() {
        return (
            <Fade className={'signup-failedAttempt'}>The information you have entered is not valid.</Fade>
        );
    }

    render() {
        return (
            <div className={'container'}>
                {
                    (this.state.redirect) ? (<Redirect to={'/'}/>) : ('')
                }
                        <Card bordered title="Sign Up" className={'signup-form-card'}>
                            <Form className={'signup-form'}>
                                <FormItem>
                                    <Input type="text"
                                           value={this.state.firstName}
                                           onChange={this.handleChange}
                                           name="firstName"
                                           id="firstName"
                                           placeholder=" First Name"/>
                                </FormItem>
                                <FormItem>
                                    <Input type="text"
                                           value={this.state.lastName}
                                           onChange={this.handleChange}
                                           name="lastName"
                                           id="lastName"
                                           placeholder=" Last Name"/>
                                </FormItem>
                                <FormItem>
                                    <Input type="email"
                                           value={this.state.email}
                                           onChange={this.handleChange}
                                           name="email"
                                           id="email"
                                           placeholder=" Email Address"/>
                                </FormItem>
                                <FormItem>
                                        <Input type="password"
                                               alue={this.state.password}
                                               onChange={this.handleChange}
                                               name="password"
                                               id="password"
                                               placeholder=" Password"/>
                                </FormItem>
                                <FormItem>
                                    <Input type="text"
                                           alue={this.state.postalCode}
                                           onChange={this.handleChange}
                                           name="postalCode"
                                           id="postalCode"
                                           placeholder=" Postal Code"/>
                                </FormItem>
                                <Button type={'primary'} onClick={this.submit} className={'signup-form-button'} >Submit</Button>
                                {
                                    (this.state.failedAttempt) ? (this.renderErrorText()) : ('')
                                }
                            </Form>
                        </Card>
            </div>
        );
    }
}

export default CreateAccount;
