import React from 'react';
import { examplePrograms } from './delp/examplePrograms';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import VisNetwork from './visLib'
import {BrowserRouter, Link, NavLink, Redirect, Route, Switch} from 'react-router-dom'

const URLtoCore = 'http://localhost/daqapClient/bridge/bridge.php';
const axios = require('axios');

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

class ExamplePrograms extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedProgram:'0'
    };
    
    this.handleChange = this.handleChange.bind(this)
  };

  handleChange(event, program){
    this.setState({
      selectedProgram:event.target.value
    });
    this.props.handleTextChange(program)
  };

  createSelectItems() {
    let items = []      
    for (var key in examplePrograms){
      items.push(<option key={key} value={key}>Example {key}</option>); 
    }
    return items
  }

  render(){
    return(
      <Form.Control as="select" size="sm" custom value={this.state.selectedProgram}  onChange={(e)=>this.handleChange(e,examplePrograms[e.target.value])}>
        {this.createSelectItems()}
      </Form.Control>
    )
}
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

  constructor(props){
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.setResponse = this.setResponse.bind(this);
  }

  setResponse(response){
    this.props.handleResponse(response);
  }

  handleOnClick(){
    let self = this;
    let delpProgram = this.props.program
    let formData = new FormData();
    formData.append('delp', delpProgram);
    formData.append('version','2018');
    formData.append('action','makeDelp');
    // Show a loader?
    axios.post(URLtoCore, formData)
    .then(function (response) {
      console.log(response.data);
      self.setResponse(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
    return(
      <Button variant="primary" size="md" block onClick={this.handleOnClick}>
        Analyze DeLP
      </Button> 
    )
  }
}

class ProgramMenu extends React.Component{

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
  };
  handleChange(optionValue){
    this.props.handleTextChange(optionValue)
  };

  render(){
    return(
      <Container>
      <Row>
        <Col md="6"><ExamplePrograms ref="selectPrograms" handleTextChange={this.handleChange}/></Col>
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

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.handleTextChange(e.target.value)
  }

  render(){
    return(
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows="3" style={textAreaProgramStyle} spellcheck="false" value={this.props.value} onChange={this.handleChange}/>
      </Form.Group>
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

class AppDeLP extends React.Component{
  constructor(props){
    super(props);
    this.state={
      delProgram: 'Null',
      coreResponse:'Null'
    };
    this.handleProgramChange = this.handleProgramChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  handleProgramChange(value){
    this.setState({delProgram: value});
  }

  handleResponse(coreResponse){
    this.setState({coreResponse:coreResponse});
  }

  render(){
  return (
    <Container fluid>
      <Row>
        <Col lg="4" style={containersStyleTEST}>
          <h6>Program</h6>
          <ProgramMenu handleTextChange={this.handleProgramChange}/>
          <TextAreaProgram value={this.state.delProgram} handleTextChange={this.handleProgramChange}/>
          <AnalyzeProgramButton program={this.state.delProgram} handleResponse={this.handleResponse}/>
        </Col>
        <Col lg="8" style={containersStyleTEST}>
        <h6>DGraph</h6>
          <VisNetwork delpGraph={this.state.coreResponse}/>
        </Col>
      </Row>
    </Container>
  )
  }
}

export default AppDeLP;
