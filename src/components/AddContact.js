import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Cookies from 'universal-cookie';
export default class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact_id: '',
            error: '',
            success: false
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
        const cookies = new Cookies();
        const token = cookies.get('token');
        fetch('http://localhost:8000/addcontact', {
            method: 'POST',
            body: JSON.stringify({
                short: this.state.contact_id
            }),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(data => {
            if(data.status === 500){
                this.setState({
                    error: 'User does not exist.'
                })
            } else {
                data.json()
                .then(jsondata => {
                    if(jsondata.message){
                        this.setState({
                            error: 'User is already in contacts.'
                        })
                    } else {
                        this.setState({
                            error: '',
                            success: true
                        })
                    }
                })
            }  
        })
    }

    msg = () => {
        if(this.state.error !== ''){
            return (<Alert variant="danger">{this.state.error}</Alert>)
        } 
        if(this.state.success === true){
            return (<Alert variant="success">Contact successfully added!</Alert>)
        }
    }
    
    render() {
        return (   
            <Container>
                <br/>
                <h3>Add a new contact</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="contact_id">
                        <Form.Label>Contact Code</Form.Label>
                        <Form.Control placeholder="Enter code" onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                            This is the short code that the contact you want to add will have shared with you.
                        </Form.Text>
                    </Form.Group>
                    {this.msg()}
                    <Button variant="outline-primary" type="submit" block>
                        Add Contact
                    </Button>
                </Form>
            </Container>
        )
    }
}
