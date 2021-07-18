import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import VisNetworkDungGraph from './visLibDungGraph'
import VisNetworkDungGraphExtensions from './visLibDungGraphExtensions'
//import {BrowserRouter, Link, NavLink, Redirect, Route, Switch} from 'react-router-dom'
const URLtoDungSolvers = 'http://localhost/daqapClient/bridge/callSolver.php';
const axios = require('axios');

const containersStyleTEST = {
  marginTop: "10px",
  width: "100%"
}

class QuerySemantic extends React.Component{

  constructor(props){
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.setResponse = this.setResponse.bind(this);
    this.AnalyzeButtonRef = React.createRef();
  }

  setResponse(response){
    this.props.handleExtensionResponse(response);
  }

  handleOnClick(){
    let self = this;
    //let formData = new FormData();
    //formData.append('arguments', this.props.args);
    //formData.append('attacks',this.props.attacks);
    //formData.append('semantics',this.props.selectedSemantic);
    //formData.append('solver',this.props.selectedSolver);
    //formData.append('action','solver'); 	  
    // Show a loader?
    //axios.post(URLtoDungSolvers, formData)
    //.then(function (response) {
     // console.log("Solver Response: ", response);
      //self.setResponse(response);
    //})
    //.catch(function (error) {
      //console.log(error);
    //});
  	self.setResponse({
		'delp':[],
		'stable':[],
		'preferred':[],
		'semistable':[],
		'grounded':['1','2'],
		'allSemantics':[]});
  }

  render(){
    return(
      <Button style={{backgroundColor:'#337ab7', border:'0px'}} size="md" block onClick={this.handleOnClick} ref={this.AnalyzeButtonRef}>
       Query 
      </Button> 
    )
  }
}

class SelectSemantic extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedSemantic:"0"
    };
    this.handleChange = this.handleChange.bind(this)
    this.refExample = React.createRef();
  };

  handleChange(event, semantic){
    this.setState({
      selectedSemantic:event.target.value
    });
    this.props.handleChangeSemantic(semantic);
  };
  
  render(){
    return(
      <Form.Control as="select" size="sm" custom value={this.state.selectedSemantic}
                    onChange={(e)=>this.handleChange(e,e.target.value)}
                    ref={this.refExample}>
        <option key={0} value="0">Select semantic</option>  
	<option key={1} value="delp">DeLP</option>
	<option key={2} value="grounded">Grounded</option>
	<option key={3} value="preferred">Preferred</option>
	<option key={4} value="stable">Stable</option>
	<option key={5} value="semistable">Semistable</option>
	<option key={6} value="allSemantics">All Semantics</option>
      </Form.Control>
    )
}
}

function SelectSolver(){
  return(
    <Form>
	  <label>Select solver:</label>
    <div key={`inline-radio`} className="mb-3" defaultValue={'inline-radio-2'}>
      <Form.Check
        inline
        label="jArgSemSat"
        name="group1"
        type="radio"
        id={`inline-radio-1`}
      />
      <Form.Check
        inline
        label="Arg-Tech"
        name="group1"
        type="radio"
	defaultChecked  
        id={`inline-radio-2`}
      />
    </div>
</Form>
  )
}

class AppDung extends React.Component{
  constructor(props){
    	super(props);
        this.state={
	    'dungGraph': {'nodes': this.props.dungGraph.argumentsObjectDung, 'arcs': this.props.dungGraph.defeatsObjectDung},
	    'solverData': {'args': this.props.dungGraph.argumentsDung, 'attacks': this.props.dungGraph.attacksDung},
	    'selectedSemantic': '0',
	    'extensions': {
		  'delp':[],
		  'grounded':[],
		  'preferred':[],
		  'stable':[],
		  'semistable':[],
		  'allExtensions':[]
	    },
	    'solver': 'jArgSemSat',	
        };
	this.handleChangeSemantic = this.handleChangeSemantic.bind(this);
	this.handleExtensionResponse = this.handleExtensionResponse.bind(this);  
  };
  
	handleChangeSemantic(newSemantic){
		this.setState({'selectedSemantic': newSemantic});
	};

	handleExtensionResponse(extensions){
		this.setState({'extensions': extensions});
	}

	
  render(){
	  return(
		  <Container fluid>
		  <Row>
		<Col lg='2' style={containersStyleTEST}>
		<label>Select Semantic:</label>
		  <SelectSemantic handleChangeSemantic={this.handleChangeSemantic}/>
		</Col>
		<Col lg='3' style={containersStyleTEST}>
		  <SelectSolver/>
		</Col>
		  <Col lg='2' style={{marginTop: '25px'}}>
		  <QuerySemantic extensions={this.state['extensions']} 
		  		 selectedSemantic={this.state['selectedSemantic']} 
		  		 selectedSolver={this.state['solver']}
				 args = {this.state['solverData']['args']}
				 attacks = {this.state['solverData']['attacks']}
		  		 handleExtensionResponse = {this.handleExtensionResponse}
		  />
		  </Col>
		  </Row>
            <Row>
                <Col lg="6" style={containersStyleTEST}>
                    <VisNetworkDungGraph dungGraph={this.state['dungGraph']}/>
                </Col>
		<Col lg="6" style={containersStyleTEST}>
                    <VisNetworkDungGraphExtensions dungGraph={this.state['dungGraph']} extension={this.state['extensions'][this.state['selectedSemantic']]}/>
                </Col>
            </Row>
		  </Container>
	  )
  
	}
}

export default AppDung;
