import React from "react";
import { Nav, Navbar } from 'react-bootstrap';
import "./navbar-view.scss";
import logo from '../../img/logo2.png';

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
                  <img className="main-logo" src={logo}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar" />
                <Navbar.Collapse id="navbar-collapse">
                    <Nav className="nav-items">
                        { isAuth() && (<Nav.Link href="/">Movies</Nav.Link>) }
                        { isAuth() && (<Nav.Link href={`/users/${user}`}>Hi, {user}</Nav.Link>) }
                        { isAuth() && (<Nav.Link variant="link" onClick={() => {onLoggedOut()}}>Logout</Nav.Link>) }
                        { !isAuth() && (<Nav.Link href='/'>Login</Nav.Link>) }
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}