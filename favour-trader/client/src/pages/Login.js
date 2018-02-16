import React, {Component} from 'react';
import {Fade} from "reactstrap"
import {Card, Row, Button, Col, Icon, Input} from 'react-materialize';
import {Redirect} from 'react-router-dom';
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
        const {authService} = this.props;
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
            <Fade>You have entered an invalid email address or password.</Fade>
        );
    }

    render() {
        return (
            <div className={'container'}>
                {
                    (this.state.redirect) ? (<Redirect to={'/'}/>) : ('')
                }
                <Row>
                    <Card className={'z-depth-3 center'}
                          header={<span className={'text-white login-header card-title'}>Favor <Icon>swap_horiz</Icon> Trader</span>}>
                        {
                            (this.state.failedAttempt) ? (this.renderErrorText()) : ('')
                        }
                        <Col s={12}>
                            <Input value={this.state.email}
                                   onChange={this.handleChange}
                                   type="email" name="email"
                                   id="email"
                                   placeholder="Email Address"/>
                        </Col>
                        <Col s={12}>
                            <Input value={this.state.password}
                                   onChange={this.handleChange}
                                   type="password"
                                   name="password"
                                   id="password"
                                   placeholder="Password"/>
                        </Col>
                        <Button className={'center blue-grey darken-3 z-depth-2'} onClick={this.submit}>Login</Button>
                        <br/> <br/>
                        <span>New to FavorTrader? <a href={'/create-account'}>sign up here</a> </span>
                    </Card>
                </Row>
            </div>
        );
    }
}

export default Login;