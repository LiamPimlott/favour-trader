import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class CreateAccount extends Component {

  render() {
    return (
		<Form>  
			<FormGroup>
				  <Label for="firstName">First Name </Label>
				  <Input type="text" name="firstName" id="firstName" placeholder=" ex. Joe " />
			</FormGroup>
			<FormGroup>
				  <Label for="lastName">Last Name </Label>
				  <Input type="text" name="password" id="lastName" placeholder=" ex. Blow " />
				</FormGroup>
			<FormGroup>
				  <Label for="streetNumber">Street Number </Label>
				  <Input type="text" name="streetNumber" id="streetNumber" placeholder=" ex. 100 " />
				</FormGroup>
			<FormGroup>
				  <Label for="street">Street </Label>
				  <Input type="text" name="street" id="street" placeholder=" ex. Favour Street " />
			</FormGroup>
			<FormGroup>
				  <Label for="postalCode">Postal Code/ZIP </Label>
				  <Input type="text" name="postalCode" id="postalCode" placeholder=" ex. A1A 1A1 " />
				</FormGroup>
			<FormGroup>
				  <Label for="city">City </Label>
				  <Input type="text" name="city" id="city" placeholder=" ex. Winnipeg " />
			</FormGroup>
			<FormGroup>
				  <Label for="state">State/Province </Label>
				  <Input type="text" name="state" id="state" placeholder=" ex. Manitoba " />
			</FormGroup>
			<FormGroup>
				  <Label for="email">Email</Label>
				  <Input type="email" name="email" id="email" placeholder=" ex. favourtrader@gmail.com" />
				</FormGroup>
			<FormGroup>
				  <Label for="confirmEmail">Confirm Email </Label>
				  <Input type="email" name="confirmEmail" id="confirmEmail"/>
			</FormGroup>
			<FormGroup>
				  <Label for="password">Password </Label>
				  <Input type="password" name="password" id="password" />	
			</FormGroup>
				<FormGroup>
				  <Label for="confirmPassword">Confirm Password </Label>
				  <Input type="password" name="confirmPassword" id="confirmPassword"/>
			</FormGroup>
			<Button>Submit</Button>	
		</Form>
    );
  }
}

export default CreateAccount;
