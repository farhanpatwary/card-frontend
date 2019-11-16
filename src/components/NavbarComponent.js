import React, { Component } from 'react'
import Cookies from 'universal-cookie';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'

import ButtonGroup from 'react-bootstrap/Button'
import Button from 'react-bootstrap/Button'

class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this)
    }
    logOut(){
        const cookies = new Cookies();
        cookies.remove('user');
        cookies.remove('token');
        this.props.signOut()
    }
    searchBarStyle = {
        'marginLeft':'100px',
        'marginRight':'100px',
        'width':'600px',
        'float':'center'
    }
    dropdownStyle = {
        'marginLeft':'100px',
        'marginRight':'100px',
        'width':'100px',
        'float':'center'
    }

    nav = ()=> {
        if(this.props.signed_in === true){
            return (
                <Nav className="justify-content-center">  
                    <Nav.Link href="#memes">My Account</Nav.Link>
                    <Nav.Link href="#memes">Settings</Nav.Link>
                    <Nav.Link href="#deets">Log Out</Nav.Link>
                </Nav>
            )
        }
        else{
            return (
                <Nav className="justify-content-center">
                    <Nav.Link href="#deets">Sign Up</Nav.Link>
                    <Nav.Link href="#memes">Sign In</Nav.Link>
                </Nav>
            )
        }  
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Nav className="mr-auto">
                </Nav>
            <Navbar.Brand href="#home"> Card </Navbar.Brand>
            <Nav className="mr-auto">
                </Nav>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav className="mr-auto">
                </Nav>
                {this.nav()}  
            </Navbar.Collapse>
            </Navbar>
            )
        }    
}

export default NavbarComponent
