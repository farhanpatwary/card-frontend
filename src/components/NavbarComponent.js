import React, { Component } from 'react'
import Cookies from 'universal-cookie';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
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
    optionstyle = {
        'text-align':'center'
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
                    <Nav.Link href="#deets" style={this.optionstyle} >Sign Up</Nav.Link>
                    <Nav.Link href="#memes" style={this.optionstyle} >Sign In</Nav.Link>
                </Nav>
            )
        }  
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg"  bg="dark" variant="dark">
                <Nav className="mr-auto">
                </Nav>
            <Navbar.Brand href="#home">Card</Navbar.Brand>
            <Navbar.Toggle/>
            <Nav className="mr-auto">
                </Nav>
                
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
