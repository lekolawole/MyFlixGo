import { Col, Container, Navbar, Form, FormControl, Nav, NavDropdown, Button, NavItem } from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom'; 
import PropTypes from 'prop-types';

import './navbar-view.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginView from '../login-view/login-view';
import { Link } from 'react-router-dom';
import { ProfileView } from '../profile-view/profile-view';
 

export class NavbarView extends React.Component {

  
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('logging out');
    this.setState({
      user: null
    });
    window.location.reload();
  }
  
  
  render() {
    let user = localStorage.getItem("user");
    const { movies } = this.props;
    return(
      <div>
        <Router>
          <Nav className="main-view-nav">
            <Nav.Item>
              <img className="main-logo" src='https://github.com/lekolawole/public/blob/main/logo2.png?raw=true'></img>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/">Movies</Nav.Link>
            </Nav.Item>
            <NavDropdown title="Profile">
              <NavDropdown.Item>Hi, {user}</NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Item>
                  <Route path={`users/${user}`} render={({ match }) => {
                    return <ProfileView movies={movies}/>
                  }} />
                  <Link to={`/users/${user}`} className="nav-links">My Account
                  </Link>
                </Nav.Item>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Item>
                  <Route path="/" render={({ match }) => {
                    return 
                        <LoginView />
                  }}
                  />
                  <Link to={`/`} onClick={() => {this.onLoggedOut()}} className="nav-links">Logout</Link>
                </Nav.Item>
              </NavDropdown.Item>
            </NavDropdown>
        </Nav>

      </Router>
    </div>
    )
  }
}
 
