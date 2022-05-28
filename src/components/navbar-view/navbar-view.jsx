import React from "react";
import { Nav, Navbar, Container, Row } from 'react-bootstrap';
import "./navbar-view.scss";

export function NavbarView({ user }) {
    
    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    };
    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return (localStorage.getItem("token"));
        } else {
            return false;
        }
    };

    return (
        <Navbar className="main-view-nav">
                <Navbar.Brand href="/">
                  <img className="main-logo" src='https://github.com/lekolawole/public/blob/main/logo2.png?raw=true'/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar" />
                <Navbar.Collapse id="navbar-collapse">
                    <Nav className="nav-items">
                        { isAuth() && (<Nav.Link href="/">Movies</Nav.Link>) }
                        { isAuth() && (<Nav.Link href={`/users/${user}`}>Hi, {user}</Nav.Link>) }
                        { isAuth() && (<Nav.Link variant="link" onClick={() => {onLoggedOut()}}>Logout</Nav.Link>) }
                        { !isAuth() && (<Nav.Link href='/'>Login</Nav.Link>) }
                        { !isAuth() && (<Nav.Link href='/register'>Register</Nav.Link>) }
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}


// import { Nav, NavDropdown, NavItem } from 'react-bootstrap';
// import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import './navbar-view.scss';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import LoginView from '../login-view/login-view';
// import { Link } from 'react-router-dom';
// import { ProfileView } from '../profile-view/profile-view';
 

// export class NavbarView extends React.Component {

  
//   onLoggedOut() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     console.log('logging out');
//     this.setState({
//       user: null
//     });
//     window.location.reload();
//   }
  
  
//   render() {
//     let user = localStorage.getItem("user");
//     const { movies } = this.props;
//     return(
//       <div>
//         <Router>
//           <Nav variant="pills" className="main-view-nav">
//             <Nav.Item>
//               <img className="main-logo" src='https://github.com/lekolawole/public/blob/main/logo2.png?raw=true'></img>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link href="/">Movies</Nav.Link>
//             </Nav.Item>
//             <NavDropdown title="Profile">
//               <NavDropdown.Item>Hi, {user}</NavDropdown.Item>
//               <NavDropdown.Item>
//                 <Nav.Item>
//                   <Route path={`users/${user}`} render={({ match }) => {
//                     return <ProfileView movies={movies}/>
//                   }} />
//                   <Link to={`/users/${user}`} className="nav-links">My Account
//                   </Link>
//                 </Nav.Item>
//               </NavDropdown.Item>
//               <NavDropdown.Item>
//                 <Nav.Item>
//                   <Route path="/" render={({ match }) => {
//                     return 
//                         <LoginView />
//                   }}
//                   />
//                   <Link to={`/`} onClick={() => {this.onLoggedOut()}} className="nav-links">Logout</Link>
//                 </Nav.Item>
//               </NavDropdown.Item>
//             </NavDropdown>
//         </Nav>

//       </Router>
//     </div>
//     )
//   }
// }
 
