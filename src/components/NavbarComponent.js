import React, { Component } from 'react'
import Cookies from 'universal-cookie';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }
    clickHandler(e){
        e.preventDefault()
        this.logOut()
    }
    logOut(){
        const cookies = new Cookies();
        cookies.remove('token');
        cookies.remove('user');
        cookies.remove('personal_email');
        cookies.remove('work_email');
        cookies.remove('phone_number');
        cookies.remove('short');

        this.props.signOut()
    }


    nav = ()=> {
        if(this.props.signed_in === true){
            return (
                <Nav className="justify-content-center">  
                    <Nav.Link href="/me">My Account</Nav.Link>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                    <Button variant="secondary" onClick={this.clickHandler}>Log Out</Button>
                </Nav>
            )
        }
        else{
            return (
                <Nav className="justify-content-center">
                    <Nav.Link href="/signupform">Sign Up</Nav.Link>
                    <Nav.Link href="/login" >Sign In</Nav.Link>
                </Nav>
            )
        }  
    }

    logostyle = {
        'fontFamily': 'Muli, sans-serif',
        'letteSpacing': '3px'
    }
    render() {
        return (
            <Navbar collapseOnSelect expand="lg"  bg="dark" variant="dark">
                <Nav className="mr-auto">
                </Nav>
            <Navbar.Brand href="/" style={this.logostyle}>CARD</Navbar.Brand>
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
