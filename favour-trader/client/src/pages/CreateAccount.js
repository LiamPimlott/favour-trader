import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './CreateAccount.css';

class CreateAccount extends Component {
	
	constructor() {
        super();
        this.state = {
          firstName: '',
          lastName: '',
          streetNumber: '',
		  street: '',
		  postalCode: '',
		  city: '',
		  state: '',
		  email: '',
		  password: ''
        };
      }
	  
	onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }
	  
	  onSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, streetNumber, street, postalCode, city, state, email, password } = this.state;
		
		//make post request here..
      }

  render() {
	  
	const inputStyle = {
		width: 600
	};
	
	const formTextStyle = {
		marginLeft: 400
	}
	
    return (
		<Form>  
			<FormGroup row>
				  <Label style={formTextStyle} for="firstName" sm={2}>First Name </Label>
				  <Col sm={15}>
					<Input style={inputStyle} type="text" name="firstName" id="firstName" placeholder=" ex. Joe " onChange={this.onChange} />
				   </Col>
			</FormGroup>
			<FormGroup row>
				  <Label style={formTextStyle} for="lastName" sm={2}>Last Name </Label>
				   <Col sm={15}>
				  <Input style={inputStyle} type="text" name="password" id="lastName" placeholder=" ex. Blow " onChange={this.onChange}/>
				  	</Col>
				</FormGroup>
			<FormGroup row>
				  <Label style={formTextStyle} for="streetNumber" sm={2}>Street Number </Label>
				  <Col sm={15}>
				  <Input style={inputStyle} type="text" name="streetNumber" id="streetNumber" placeholder=" ex. 100 " onChange={this.onChange}/>
				  </Col>
				</FormGroup>
			<FormGroup row>
				  <Label style={formTextStyle} for="street" sm={2}>Street </Label>
				  <Col sm={15}>
				  <Input style={inputStyle} type="text" name="street" id="street" placeholder=" ex. Favour Street " onChange={this.onChange}/>
				  </Col>
			</FormGroup>
			<FormGroup row>
				  <Label style={formTextStyle} for="postalCode" sm={2}>Postal Code/ZIP </Label>
				  <Col sm={15}>
				  <Input style={inputStyle} type="text" name="postalCode" id="postalCode" placeholder=" ex. A1A 1A1 " onChange={this.onChange}/>
				  </Col>
				</FormGroup>
			<FormGroup row>
				  <Label style={formTextStyle} for="city" sm={2}>City </Label>
				  <Col sm={15}>
				  <Input style={inputStyle} type="text" name="city" id="city" placeholder=" ex. Winnipeg " onChange={this.onChange}/>
				  </Col>
			</FormGroup>
			<FormGroup row>
				  <Label style={formTextStyle} for="state" sm={2}>State/Province </Label>
				  <Col sm={15}>
				  <Input style={inputStyle} type="text" name="state" id="state" placeholder=" ex. Manitoba " onChange={this.onChange}/>
				  </Col>
			</FormGroup>
			<FormGroup row>
				  <Label style={formTextStyle} for="email" sm={2}>Email</Label>
				  <Col sm={15}>
				  <Input style={inputStyle} type="email" name="email" id="email" placeholder=" ex. favourtrader@gmail.com" onChange={this.onChange}/>
				  </Col>
				</FormGroup>
			<FormGroup row>
				  <Label style={formTextStyle} for="confirmEmail" sm={2}>Confirm Email </Label>
				  <Col sm={15}>
				  <Input style={inputStyle} type="email" name="confirmEmail" id="confirmEmail" onChange={this.onChange}/>
				  </Col>
			</FormGroup>
			<FormGroup row>
				  <Label style={formTextStyle} for="password" sm={2}>Password </Label>
				  <Col sm={15}>
				  <Input style={inputStyle} type="password" name="password" id="password" onChange={this.onChange}/>	
				  </Col>
			</FormGroup>
				<FormGroup row>
				  <Label style={formTextStyle} for="confirmPassword" sm={2}>Confirm Password </Label>
				  <Col sm={15}>
				  <Input style={inputStyle} type="password" name="confirmPassword" id="confirmPassword" onChange={this.onChange}/>
				  </Col>
			</FormGroup>
			<Button type="submit" onClick = {this.onSubmit}>Submit</Button>	
		</Form>
    );
  }
}

export default CreateAccount;
