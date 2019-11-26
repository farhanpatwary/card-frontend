import React from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Alert from 'react-bootstrap/Alert'

const Contact = (props) => {
    return (
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                    <Card.Title>
                        {props.data.name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <p>Personal Email: {props.data.personal_email}</p>
                        <p>Phone Number: {props.data.phone_number !== "" ? props.data.phone_number : "N/A"}</p>
                        <Alert variant="dark">Short Code: {props.data.short}</Alert>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default Contact
