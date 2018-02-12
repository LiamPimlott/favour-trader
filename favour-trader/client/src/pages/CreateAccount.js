import React, {Component} from 'react';
import {Fade, Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle} from 'reactstrap';
import { Redirect } from 'react-router-dom';

class CreateAccount extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            streetNumber: "",
            streetName: "",
            postalCode: "",
            city: "",
            state: "",
            redirect: false,
            failedAttempt: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.renderErrorText = this.renderErrorText.bind(this);        
        this.submit = this.submit.bind(this);
    }   

    componentWillMount() {
        console.log(this.props);
        const { authService } = this.props;
        if (authService.loggedIn()) {
            this.setState({
                redirect: true,
            });
        }
    }    

    submit() {
        const { authService } = this.props;
        authService.signup(this.state.firstName,this.state.lastName,this.state.streetNumber,this.state.street,this.state.postalCode,this.state.city,this.state.state,this.state.email, this.state.password)
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
            <Fade className={'signup-failedAttempt'}>The information you have entered not valid.</Fade>
        );
    }

    render() {
        return (
            <div className={'container'}>
                {
                    (this.state.redirect) ? (<Redirect to={'/'}/>) : ('')
                }
                <div className={'row'}>
                    <Card outline className={'offset-md-4 col-md-8'}>
                        <CardTitle className={'p-2'}>Sign Up</CardTitle>
                        <Form className={'p-3'}>
                            <FormGroup>
                                <Label for="firstName">First Name </Label>
                                <Input type="text" 
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                    name="firstName" 
                                    id="firstName" 
                                    placeholder=" ex. Joe "/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name </Label>
                                <Input type="text" 
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                    name="lastName" 
                                    id="lastName" 
                                    placeholder=" ex. Blow "/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="streetNumber">Street Number </Label>
                                <Input type="text" 
                                    value={this.state.streetNumber}
                                    onChange={this.handleChange}
                                    name="streetNumber" 
                                    id="streetNumber" 
                                    placeholder=" ex. 100 "/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="street">Street </Label>
                                <Input type="text" 
                                    value={this.state.street}
                                    onChange={this.handleChange}
                                    name="street" 
                                    id="street" 
                                    placeholder=" ex. Favour Street "/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="postalCode">Postal Code/ZIP </Label>
                                <Input type="text" 
                                    value={this.state.postalCode}
                                    onChange={this.handleChange} 
                                    name="postalCode" 
                                    id="postalCode" 
                                    placeholder=" ex. A1A 1A1 "/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="city">City </Label>
                                <Input type="text" 
                                    value={this.state.city}
                                    onChange={this.handleChange} 
                                    name="city" 
                                    id="city" 
                                    placeholder=" ex. Winnipeg "/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="state">State/Province </Label>
                                <Input type="text" 
                                    value={this.state.state}
                                    onChange={this.handleChange} 
                                    name="state" 
                                    id="state" 
                                    placeholder=" ex. Manitoba "/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" 
                                    value={this.state.email}
                                    onChange={this.handleChange} 
                                    name="email" 
                                    id="email" 
                                    placeholder=" ex. favourtrader@gmail.com"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmEmail">Confirm Email </Label>
                                <Input type="email" 
                                    name="confirmEmail" 
                                    id="confirmEmail"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password </Label>
                                <Input type="password" 
                                    alue={this.state.password}
                                    onChange={this.handleChange}
                                    name="password" 
                                    id="password"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmPassword">Confirm Password </Label>
                                <Input type="password" 
                                    name="confirmPassword" 
                                    id="confirmPassword"/>
                            </FormGroup>
                            <Button onClick={this.submit}>Submit</Button>
                          
                        </Form>
                    </Card>
                </div>
            </div>
        );
    }
}

export default CreateAccount;
