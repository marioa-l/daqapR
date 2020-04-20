import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {BrowserRouter, Link, NavLink, Redirect, Route, Switch} from 'react-router-dom'



const containersStyleTEST = {
  border:"0px solid blue",
  fontSize: "15px",
  marginTop:"20px"
}

const rowStyleButtonsTEST = {
  marginTop:"2px"
}

const textAreaProgramStyle = {
    resize: "none",
    fontFamily: "Consolas",
    fontSize: "18px",
    height: "65vh",
    marginTop: "5px"
}

function ExamplePrograms(){
  return(
    <Form.Control as="select" size="sm" custom>
      <option>Example 1</option>
      <option>Example 2</option>
      <option>Example 3</option>
      <option>Example 4</option>
      <option>Example 5</option>
    </Form.Control>
  )
}

function SelectPreferenceCriterion(){
  return(
    <Container>
      <Row>
          <Button variant="secondary" size="sm" block>
            Preference Criterion
          </Button>
      </Row>
    </Container>
  )
}

class AnalyzeProgramButton extends React.Component{
  render(){
    return(
      <Button variant="primary" size="md" block>
        Analyze DeLP
      </Button> 
    )
  }
}

class ProgramMenu extends React.Component{
  render(){
    return(
      <Container>
      <Row>
        <Col md="6"><ExamplePrograms/></Col>
        <Col md="6"><Button variant="info" size="sm" block>Load from disk</Button></Col>
      </Row>
      <Row style={{marginTop:"3px"}}>
        <Col md="6"><Button variant="info" size="sm" block>Generate randomly</Button></Col>
        <Col md="6"><SelectPreferenceCriterion /></Col>
      </Row>
      </Container>
    )
  }
}

class TextAreaProgram extends React.Component{
  render(){
    return(
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows="3" style={textAreaProgramStyle} spellcheck="false"/>
      </Form.Group>
    )
  }
}

class TablesOfArguments extends React.Component{
  render(){
    return(
      <Table responsive size="sm" style={{marginTop:"4px"}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

class NavVar extends React.Component{
  render(){
    return(
      <Navbar bg="primary" variant="dark" style={{height:"40px"}}>
      <Navbar.Brand href="#home">DAQAP (v2)</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home" active>DeLP</Nav.Link>
        <Nav.Link href="#features">Dung</Nav.Link>
        <Nav.Link href="#pricing">Others</Nav.Link>
      </Nav>
    </Navbar>
    )
  }
}

// class TabsNav extends React.Component{
//   render(){
//     return(
//       <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" bg="primary">
//         <Tab eventKey="home" title="Home">
//           <ProgramMenu />
//         </Tab>
//         <Tab eventKey="profile" title="Profile">
//           <TextAreaProgram />
//         </Tab>
//       </Tabs>
//     )
//   }
// }

function AppDung() {
  return (
    <Container fluid>
      <Row>
        <Col lg="4" style={containersStyleTEST}>
          <h6>Program</h6>
          <ProgramMenu/>
          <TextAreaProgram/>
        </Col>
        <Col lg="8" style={containersStyleTEST}><h6>DGraph</h6>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <TablesOfArguments/>
        </Col>
        <Col>
          <TablesOfArguments/>
        </Col>
      </Row>*/}
    </Container>
  )
}

export default AppDung;
