import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
export default class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            personal_email: '',
            work_email: '',
            phone_number: '',
            password: '',
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
        if(this.state.email === '' || this.state.password === ''){
            alert('Please enter email and password')
            return
        }
        let formdata = {
            name:this.state.name,
            personal_email: this.state.personal_email,
            work_email: this.state.work_email,
            phone_number: this.state.phone_number,
            password: this.state.password
        }
        fetch('http://localhost:8000/users', {
            method: 'POST',
            body: JSON.stringify(formdata),
            headers: {
                'Content-Type':'application/json',
            }    
        })
        .then((data)=>{
            if(data.ok === false){
                return alert('User already exists. Please sign in or create a new user.')
            }
            data.json()
            .then((jsondata) => {
                const cookies = new Cookies()
                cookies.set('token', jsondata.token);
                cookies.set('user', jsondata.user.name);
                cookies.set('personal_email', jsondata.user.personal_email);
                cookies.set('work_email', jsondata.user.work_email);
                cookies.set('short', jsondata.user.short);
                this.props.signIn()
            })
        }) 
    }

    render() {
        if(this.props.signed_in === true){
            return <Redirect to='/' />
        }
        else {
            return (
                <Container>
                    <br/>
                    <h3>Sign Up to Giraffe</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Name" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="personal_email">
                            <Form.Label>Personal Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} />
                            <Form.Text className="text-muted">
                                Required. This is the email address you will use to sign in.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="work_email">
                            <Form.Label>Work Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} />
                            <Form.Text className="text-muted">
                                You can add a work email address if you like.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="phone_number">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control placeholder="Password" onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
                            <Form.Text className="text-muted">
                                Password must be at least 7 characters.
                            </Form.Text>
                        </Form.Group>
                        <p>Already Registered? <a href="/login">Sign In here.</a></p>
                        <Button variant="outline-primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Container>
            )    
        }
    }
}
