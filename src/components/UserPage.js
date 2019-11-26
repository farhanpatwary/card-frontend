import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Cookies from 'universal-cookie';
export default class UserPage extends Component {

    render(){
        const cookies = new Cookies();
        const user = cookies.get('user');
        const personal_email = cookies.get('personal_email');
        const phone_number = cookies.get('phone_number');
        const short = cookies.get('short');

        const style = {
            //'textAlign':'center',
            'lineHeight': '3rem'
        }

        
        return (
            <Container style={style}>
                <p></p>
                <h1>
                    {user}
                </h1>
                <h5>
                    Personal Email: {personal_email}
                </h5>
                <h5>
                    Phone Number: {phone_number}
                </h5>
                <Alert variant="primary">
                    <br/>
                    <h2>
                        Code: {short}
                    </h2>
                    <br/>
                    <p>Other people can add you to their contacts using this code.</p>
                </Alert>
                <Button variant="outline-primary" block><a href="/settings">Go to Account Settings</a></Button>
            </Container>
        )
    }
}