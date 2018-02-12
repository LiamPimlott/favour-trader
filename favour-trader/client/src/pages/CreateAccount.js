import React, { Component } from 'react';
import {Fade, Button, Form, FormGroup, Label, Input, Card, CardTitle, Col} from 'reactstrap';
import axios from 'axios';
import './CreateAccount.css';
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
            country: "",
            city: "",
            state: "",
            redirect: false,
            failedAttempt: false,
            allSkills: [],
            hasSkills: [],
            wantSkills: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.renderErrorText = this.renderErrorText.bind(this);        
        this.submit = this.submit.bind(this);
    }   

    componentWillMount() {
        const { authService } = this.props;

        axios.get('/api/skills/all')
        .then(res => res.data)
        .then(data => this.setState({allSkills: data }));

        if (authService.loggedIn()) {
            this.setState({
                redirect: true,
            });
        }
    }

    skillSelected(skill, label) {
        if (label === 'Skills You Have') {
            let hasSkills = this.state.hasSkills;
            let index = hasSkills.indexOf(skill);
            if (index !== -1) {
                hasSkills.splice(index, 1);
            } else {
                hasSkills.push(skill);
            }
            this.setState({
                hasSkills,
            })
        } else {
            let wantSkills = this.state.wantSkills;
            let index = wantSkills.indexOf(skill);
            if (index !== -1) {
                wantSkills.splice(index, 1);
            } else {
                wantSkills.push(skill);
            }
            this.setState({
                wantSkills,
            })
        }
    }

    renderSelectOptions(label) {
        const skills = this.state.allSkills;
        return(
            <FormGroup>
            <Label for="exampleSelectMulti">{label}</Label>
            {
                (skills !== []) ? (
                    <ul className={'SkillList'} name="selectMulti" id="exampleSelectMulti" multiple>
                        {
                            skills.map(function (skill) {
                                return (
                                <li className={'text-left mr-3'} key={skill._id}>
                                    <input className={'mr-1'} type={'checkbox'} onClick={this.skillSelected.bind(this, skill, label)}/>
                                    {skill.skill}
                                </li>)
                            }, this)
                        }
                    </ul>
                ) : (
                        ''
                )
            }
            </FormGroup>
        );
    }

    submit() {
        const { authService } = this.props;
        authService.signup(
            this.state.firstName,
            this.state.lastName,
            this.state.streetNumber,
            this.state.street,
            this.state.postalCode,
            this.state.country,
            this.state.city,
            this.state.state,
            this.state.email,
            this.state.password,
            this.state.hasSkills,
            this.state.wantSkills,
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
                <div className={'row'}>
                    <Card outline className={'offset-md-4 col-md-8'}>
                        <CardTitle className={'p-2'}>Sign Up</CardTitle>
                        <Form className={'p-3'}>
                            <FormGroup row>
                                <Label for="firstName" className={'text-left'} sm={3}>First Name: </Label>
                                <Col sm={9}>
                                <Input type="text" 
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                    name="firstName" 
                                    id="firstName" 
                                    placeholder=" ex. Joe "/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="lastName" className={'text-left'} sm={3}>Last Name: </Label>
                                <Col sm={9}>
                                <Input type="text" 
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                    name="lastName" 
                                    id="lastName" 
                                    placeholder=" ex. Blow "/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="streetNumber" className={'text-left'}  sm={3}>Street Number: </Label>
                                <Col sm={9}>
                                <Input type="text" 
                                    value={this.state.streetNumber}
                                    onChange={this.handleChange}
                                    name="streetNumber" 
                                    id="streetNumber" 
                                    placeholder=" ex. 100 "/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="street" className={'text-left'} sm={3}>Street: </Label>
                                <Col sm={9}>
                                <Input type="text" 
                                    value={this.state.street}
                                    onChange={this.handleChange}
                                    name="street" 
                                    id="street" 
                                    placeholder=" ex. Favour Street "/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="postalCode" className={'text-left'} sm={3}>Postal Code/ZIP: </Label>
                                <Col sm={9}>
                                <Input type="text"
                                    value={this.state.postalCode}
                                    onChange={this.handleChange} 
                                    name="postalCode" 
                                    id="postalCode" 
                                    placeholder=" ex. A1A 1A1 "/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="country" className={'text-left'} sm={3}>Country: </Label>
                                <Col sm={9}>
                                    <Input type="text"
                                           value={this.state.country}
                                           onChange={this.handleChange}
                                           name="country"
                                           id="country"
                                           placeholder=" ex. Canada "/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="city" className={'text-left'} sm={3}>City: </Label>
                                <Col sm={9}>
                                <Input type="text"
                                    value={this.state.city}
                                    onChange={this.handleChange} 
                                    name="city" 
                                    id="city" 
                                    placeholder=" ex. Winnipeg "/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="state" className={'text-left'} sm={3}>State/Province: </Label>
                                <Col sm={9}>
                                <Input type="text"
                                    value={this.state.state}
                                    onChange={this.handleChange} 
                                    name="state" 
                                    id="state" 
                                    placeholder=" ex. Manitoba "/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" className={'text-left'} sm={3}>Email: </Label>
                                <Col sm={9}>
                                <Input type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange} 
                                    name="email" 
                                    id="email" 
                                    placeholder=" ex. favourtrader@gmail.com"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="confirmEmail" className={'text-left'} sm={3}>Confirm Email: </Label>
                                <Col sm={9}>
                                <Input type="email"
                                    name="confirmEmail" 
                                    id="confirmEmail"
                                       placeholder=" ex. favourtrader@gmail.com"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="password" className={'text-left'} sm={3}>Password: </Label>
                                <Col sm={9}>
                                <Input type="password"
                                    alue={this.state.password}
                                    onChange={this.handleChange}
                                    name="password" 
                                    id="password"
                                       placeholder=" ex. Password"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="confirmPassword" className={'text-left'} sm={3}>Confirm Password: </Label>
                                <Col sm={9}>
                                <Input type="password"
                                    name="confirmPassword" 
                                    id="confirmPassword"
                                       placeholder=" ex. Password"/>
                                </Col>
                            </FormGroup>
                            {
                                this.renderSelectOptions("Skills You Have")
                            }
                            {
                                this.renderSelectOptions("Skills You Want")
                            }
                            <Button onClick={this.submit}>Submit</Button>
                            {
                                (this.state.failedAttempt) ? (this.renderErrorText()) : ('')
                            }
                        </Form>
                    </Card>
                </div>
            </div>
        );
    }
}

export default CreateAccount;
