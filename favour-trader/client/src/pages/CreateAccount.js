import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class CreateAccount extends Component {

  render() {
    return (
       <Form>
	   
		<FormGroup>
          <Label for="firstName">First Name </Label>
          <Input name="firstName" id="firstName" placeholder=" ex. Joe " />
        </FormGroup>
		<FormGroup>
          <Label for="lastName">Last Name </Label>
          <Input name="password" id="lastName" placeholder=" ex. Blow " />
        </FormGroup>
		<FormGroup>
          <Label for="streetNumber">Street Number </Label>
          <Input name="password" id="lastName" placeholder=" ex. 100 " />
        </FormGroup>
		<FormGroup>
          <Label for="street">Street </Label>
          <Input name="password" id="lastName" placeholder=" ex. Favour Street " />
        </FormGroup>
		<FormGroup>
          <Label for="postalCode">Postal Code/ZIP </Label>
          <Input name="password" id="lastName" placeholder=" ex. A1A 1A1 " />
        </FormGroup>
		<FormGroup>
          <Label for="city">City </Label>
          <Input name="password" id="lastName" placeholder=" ex. Winnipeg " />
        </FormGroup>
		<FormGroup>
          <Label for="state">State/Province </Label>
          <Input name="password" id="lastName" placeholder=" ex. Manitoba " />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder=" ex. favourtrader@gmail.com" />
        </FormGroup>
		   <FormGroup>
          <Label for="confirmEmail">Confirm Email </Label>
          <Input type="email" name="email" id="exampleEmail"/>
        </FormGroup>
		   <FormGroup>
          <Label for="password">Password </Label>
          <Input type="password" name="email" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password </Label>
          <Input type="password" name="password" id="examplePassword"/>
        </FormGroup>
        <Button>Submit</Button>
		
      </Form>

    );
  }
}

export default CreateAccount;
