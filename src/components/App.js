import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import NavbarComponent from './NavbarComponent'
import About from './About'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import UserSettings from './UserSettings'

import UserPage from './UserPage'
import AddContact from './AddContact'
import Contacts from './Contacts'

class App extends Component {
  constructor(){
    super()
    const cookies = new Cookies();
    var user = cookies.get('user') === undefined ? undefined : cookies.get('user')
    const loggedin = (user === undefined) ? false : true
    this.state = {
      signed_in: loggedin,
      current_tab: 'Popular',
      current_user: user,
    }
  }
  signIn(){
    const cookies = new Cookies();
    var user = cookies.get('user') === undefined ? undefined : cookies.get('user')
    this.setState({
      signed_in: true,
      current_user: user
    })
  }
  signOut(){
    this.setState({
      signed_in: false,
      current_user: undefined
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <NavbarComponent
          current_tab={this.state.current_tab}
          current_user={this.state.current_user}
          signed_in={this.state.signed_in}
          signIn={this.signIn.bind(this)} 
          signOut={this.signOut.bind(this)}
          />
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
          <Route path='/about' component={About}/>
          <Route path='/signupform' render={(props) => (
            <SignUpForm {...props} 
            signIn={this.signIn.bind(this)}
            signed_in={this.state.signed_in}
            />
          )}/>
          <Route path='/login' render={(props) => (
            <LoginForm {...props} 
            signIn={this.signIn.bind(this)}
            signed_in={this.state.signed_in}
            />
          )}/>
          <Route path='/users/:id' component={UserPage}/>
          <Route path='/settings' render={(props)=> (
            <UserSettings {...props}
            signOut={this.signOut.bind(this)}
            />
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
