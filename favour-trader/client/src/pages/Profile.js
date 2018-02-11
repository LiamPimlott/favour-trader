import React, { Component } from 'react';
import {Media, Jumbotron, Container, Row, Col } from 'reactstrap';
import userPic from './userPic.jpg';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

var imgStyle = {
  maxWidth: "100px",
};
class Profile extends Component {
  render() {
    return (
      <div>      	
      	<Container fluid>
      	  <Jumbotron >
      		<Row>
      		  <Col xs="6" sm="4">
      			<Media>
			  <Media left href="#">
			    <Media style={imgStyle} object src={userPic} alt="user's image" />
			  </Media>
			  <Media body>
			    <Media heading>
			      user name
			    </Media>
			    his@email.com 
			  </Media>
		        </Media>
      			<Row noGutters><h6>user name</h6></Row>
			<Row noGutters>An introduction is the first paragraph of a written research paper, or the first thing you say in an oral presentation, or the first thing people see, hear, or experience about your project. </Row>
      		  </Col>      		
      		  <Col >
      			<h3>Has:</h3>
      			<Row noGutters>
      			  <ListGroup>
				  <ListGroupItem className="justify-content-between">Cras justo odio <Badge pill>14</Badge></ListGroupItem>
				  <ListGroupItem className="justify-content-between">Dapibus ac facilisis in <Badge pill>2</Badge></ListGroupItem>
				  <ListGroupItem className="justify-content-between">Morbi leo risus <Badge pill>1</Badge></ListGroupItem>
		      	  </ListGroup>
      			</Row>				
      		  </Col>
      		  <Col >
      		<h3>Wants:</h3>
      			<Row>
      			  <ListGroup>
		            <ListGroupItem className="justify-content-between">Cras justo odio <Badge pill>14</Badge></ListGroupItem>
		            <ListGroupItem className="justify-content-between">Dapibus ac facilisis in <Badge pill>2</Badge></ListGroupItem>
		            <ListGroupItem className="justify-content-between">Morbi leo risus <Badge pill>1</Badge></ListGroupItem>
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
