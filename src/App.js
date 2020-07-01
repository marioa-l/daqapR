import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {BrowserRouter, Link, NavLink, Redirect, Route, Switch} from 'react-router-dom'
import AppDeLP from './delp/delp'
// import AppDung from './dung'

function App() {
  return (
    <BrowserRouter>
        <Navbar expand="sm" style={{height:"30px", backgroundColor: '#337ab7'}}>
          <Navbar.Brand as={Link} to="/" style={{color:'white'}}>DAQAP (Devs)</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/page1" style={{color:'white'}}>DeLP</Nav.Link>
              {/* <Nav.Link as={NavLink} to="/page2">Dung</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path='/page1' component={AppDeLP}/>
          {/* <Route exact path='/page2' component={AppDung}/> */}
          <Redirect from="/" to="/page1"/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;

