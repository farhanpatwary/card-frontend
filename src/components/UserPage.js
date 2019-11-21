import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Cookies from 'universal-cookie';
export default class UserPage extends Component {

    render(){
        const cookies = new Cookies();
        const user = cookies.get('user');
        const personal_email = cookies.get('personal_email');
        const work_email = cookies.get('work_email');
        const short = cookies.get('short');

        const style = {
            'textAlign':'center',
        }
        
        return (
            <Container style={style}>
                <br/>
                <h1>
                    {user}
                </h1>
                <h5>
                    Personal Email: {personal_email}
                </h5>
                <h5>
                    Work Email: {work_email}
                </h5>
                <Alert variant="primary">
                    <br/>
                    <h2>
                        Code: {short}
                    </h2>
                    <br/>
                    <p>Other people can add you to their contacts using this code.</p>
                </Alert>
            </Container>
        )
    }
}