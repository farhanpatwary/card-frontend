import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Cookies from 'universal-cookie';

import Contact from './Contact'

export class Contacts extends Component {
    current_page = 0
    constructor(props) {
        super(props);
        this.state = {
          contacts: [],
          loaded: false,
        };
    }
    componentDidMount(){
            const cookies = new Cookies();
            const token = cookies.get('token');
            fetch('http://localhost:8000/contacts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(data => data.json())
            .then(jsondata => this.setState({
                contacts: jsondata,
                loaded:true
            }))
    }

    render() {
        if(this.state.loaded === false){
            return (
                <Container>
                    <br/>
                    Loading Content
                    <br/>
                </Container>
            )
        }      
        else{
            const content = this.state.contacts.map((contact) => 
                <Contact data={contact} key={contact._id}/>
            )
            return (
                <Container>
                    <br/>
                    {content}
                    <br/>
                </Container>
            )
        }
    }
}

export default Contacts
