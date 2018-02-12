import React, { Component } from 'react';
import {Media, Jumbotron, Container, Row, Col } from 'reactstrap';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import axios from 'axios'

class Profile extends Component {
	
	constructor() {
		super();
		this.state = {
				userName: '',
				userEmail: '',
				about: '',
				has: [],
				wants: []
		};	
	}

	componentDidMount() {
		const { authService } = this.props;
		if (authService.loggedIn()) {
				const config = {
						headers: {
							Authorization: authService.getToken()
						}
				};
				
				axios.get('/api/users/profile', config)
				.then(res => res.data.user)
				.then(userData => this.setState({
					userName: userData.name.first + " " + userData.name.last,
					userEmail: userData.email,
					about: userData.about,
					has: userData.has,
					wants: userData.wants
				}))
				.catch((err) => {
					console.log(err);
				});
		}
	}	

	renderSkills(skillSet) {
		const skills = this.state[skillSet];
		return (
				<div>
						{
								(skills !== []) ? (
										<ul>
												{
														skills.map(function (skill) {
																return (
																	<ListGroupItem className="justify-content-between" key={skill._id}>
																		{skill.skill}
																	</ListGroupItem>
																)
														}, this)
												}
										</ul>
								) : (
												''
								)
						}
				</div>
		);
}
	
	render() {
    return (
      <div>      	
      	<Container fluid>
      	  <Jumbotron >
      		<Row>
      		  <Col xs="6" sm="4">
      			<Media>
			  <Media left href="#">
			  </Media>
			  <Media body>
			    <Media heading>
			      {this.state.userName}
			    </Media>
			    {this.state.userEmail}
			  </Media>
		        </Media>
			      <Row noGutters>
							{this.state.about}
						</Row>
      		  </Col>      		
      		  <Col >
      			<h3>Has:</h3>
      			<Row noGutters>
      			  <ListGroup>
								{this.renderSkills('has')}
		      	  </ListGroup>
      			</Row>				
      		  </Col>
      		  <Col >
      		<h3>Wants:</h3>
      			<Row>
      			  <ListGroup>
								{this.renderSkills('wants')}
		      	  </ListGroup>
      			</Row>				
      		</Col>
      	      </Row>
      	  </Jumbotron>
      	</Container>
      </div>
    );
  }
}

export default Profile;
