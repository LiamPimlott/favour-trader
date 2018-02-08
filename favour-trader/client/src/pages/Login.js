import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {

    render() {
        return (
            <div>
                <Form>
                    <FormGroup row>
                        <Label for="email" sm={2}>Login:</Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="email" placeholder="Email Address" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={2}>Password:</Label>
                        <Col sm={10}>
                            <Input type="password" name="password" id="password" placeholder="Password" />
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default Login;