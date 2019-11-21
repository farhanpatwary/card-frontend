import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'

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
                <Contact/>
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
