import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personal_email: '',
            password: '',
            correctCredentials: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const id = target.id;
        this.setState({
            [id]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.email === '' || this.state.password === '') {
            alert('Please enter email and password')
            return
        }
        const formdata = {
            personal_email: this.state.personal_email,
            password: this.state.password
        }
        fetch('https://fast-card-api.herokuapp.com/users/login', {
                method: 'POST',
                body: JSON.stringify(formdata),
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((data) => {
                console.log(data)
                if (data.ok === true) {
                    this.setState({
                        correctCredentials: true
                    })
                }
                data.json()
                    .then((jsondata) => {
                        const cookies = new Cookies();
                        if (this.state.correctCredentials === true) {
                            cookies.set('token', jsondata.token);
                            cookies.set('user', jsondata.user.name);
                            cookies.set('personal_email', jsondata.user.personal_email);
                            cookies.set('phone_number', jsondata.user.phone_number); 
                            cookies.set('short', jsondata.user.short);            
                            return this.props.signIn()
                        }
                    })
                    .catch((e) => (alert(e)))
            })
            .catch((e) => alert(e))
    }
    
    render() {
        if(this.props.signed_in === true){
            return <Redirect to='/' />
        }
        else{
            return (   
                <Container>
                    <br/>
                    <h3>Log In to Card</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="personal_email">
                            <Form.Label>Personal Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
                            <Form.Text className="text-muted">
                                Enter your password.
                            </Form.Text>
                        </Form.Group>
                        <p>Don't have an account? <a href="/signupform">Register here.</a></p>
                        <Button variant="outline-primary" type="submit">
                            Log in
                        </Button>
                    </Form>
                </Container>
            )
        }
        }
}
