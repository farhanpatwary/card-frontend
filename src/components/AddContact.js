import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

export default class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact_id: ''
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
                    <Button variant="outline-primary" type="submit">
                        Add Contact
                    </Button>
                </Form>
            </Container>
        )
    }
}
