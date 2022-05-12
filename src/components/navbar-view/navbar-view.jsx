import { Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom'; 
import './navbar-view.scss';
 

export class NavbarView extends React.Component {
  render() {
    return(
      <div>
      <Nav >
          <Nav.Item>
            <img className="main-logo" src='https://github.com/lekolawole/public/blob/main/logo2.png?raw=true'></img>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Movies</Nav.Link>
          </Nav.Item>
          <NavDropdown title="Profile">
            <NavDropdown.Item>
              <Nav.Link onClick={() => {this.onLoggedOut()}}>Logout</Nav.Link>
            </NavDropdown.Item>
          </NavDropdown>
      </Nav>
    </div>
    )
  }
}
 