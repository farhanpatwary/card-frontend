import React from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

const Contact = (props) => {

    return (
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                    <Card.Title></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default Contact
