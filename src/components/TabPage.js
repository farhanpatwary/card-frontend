import React from 'react'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'

import UserPage from './UserPage'
import AddContact from './AddContact'
import Contacts from './Contacts'

export default function TabPage(props) {
    if(props.signed_in === true){
        return (
            <div>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="justify-content-center">
                    <Tab eventKey="add" title="Add Friend">
                    <AddContact/>
                    </Tab>
                    <Tab eventKey="profile" title="Home">
                    <UserPage/>
                    </Tab>
                    <Tab eventKey="contacts" title="My Contacts">
                    <Contacts/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
    else{
        return (
            <div>
                <br/>
                <Container>
                    <Jumbotron>
                    <br/>
                        <h5>
                            To use this app you must <a href="/login">Sign in</a>.
                        </h5>
                        <h5>
                        If you don't have an account you can <a href="/signupform">Register</a> here.
                        </h5>
                </Jumbotron>
                </Container>
            </div>
            
        )
    }
    
}
