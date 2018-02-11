import React, { Component } from 'react';
import { Card, CardTitle, Col, Button, Fade, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import './Login.css';

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
        const { authService } = this.props;
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
            <Fade className={'text-danger Login-failedAttemptText'}>The information you have entered not valid.</Fade>
        );
    }

    render() {
        return (
            <div className={'container'}>
                <div className={'row'}>
                    <Card outline className={'offset-md-4 col-md-8'}>
                        <CardTitle className={'p-2'}>Login</CardTitle>
                        {
                            (this.state.redirect) ? (<Redirect to={'/'} />) : ('')
                        }
                        <Form action={null}>
                            <FormGroup row>
                                <Label for="email" sm={2}>Login:</Label>
                                <Col sm={10}>
                                    <Input value={this.state.emailInput}
                                        onChange={this.handleChange}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email Address" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="password" sm={2}>Password:</Label>
                                <Col sm={10}>
                                    <Input value={this.state.password}
                                        onChange={this.handleChange}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password" />
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col className={'mx-auto Login-failedAttemptContainer'} sm={{ size: 10 }}>
                                    {
                                        (this.state.failedAttempt) ? (this.renderErrorText()) : ('')
                                    }
                                    <Button className={'m-3 Login-btn'} onClick={this.submit}>Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Login;