import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount(){
        const { authService } = this.props;
        if(authService.loggedIn()) {
            this.props.history.replace('/');
        }
    }

    submit() {
        const { authService } = this.props;
        authService.login(this.state.email, this.state.password)
            .then(res => {
                this.props.history.replace('/');
            })
            .catch(err =>{
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

    render() {
        return (
            <div>
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
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button onClick={this.submit}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default Login;