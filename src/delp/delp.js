import React, { useEffect, useState } from "react";
import { examplePrograms } from './examplePrograms';
import { generate_graph_structures, generate_tree_graph_structures } from "./DataParsing";
import Generators from './generators/generators';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import VisNetworkDeLPGraph from './visLibDeLPGraph'
import VisLibTrees from "./visLibTrees";
import Spinner from 'react-bootstrap/Spinner'

//const URLtoCore = 'http://localhost/daqapClient/bridge/bridge.php';
const URLtoCore = 'https://hosting.cs.uns.edu.ar/~daqap/bridge/bridge.php';

const axios = require('axios');

const containersStyleTEST = {
  marginTop: "10px",
  width: "100%"
}



const textAreaProgramStyle = {
  resize: "none",
  fontFamily: "Consolas",
  fontSize: "14px",
  height: "65vh",
  marginTop: "5px"
}

class ModalDeLP extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      modalInfo:{
        visible: false,
        msg: ''
      }
    };
  }

  componentDidUpdate(prevProps){
    const visible = this.props.modalInfo.visible;
    const msg = this.props.modalInfo.msg;
    if (visible !== prevProps.modalInfo.visible){
      this.setState({modalInfo: {visible: visible, msg: msg}})
    }
  }

  render(){
    return (
      <>
      <Modal
      show={this.state.modalInfo['visible']}
      size="sm"
      centered
    >
      <Modal.Header>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center">
        {this.state.modalInfo['msg']}
        <Spinner animation="grow" size='sm' variant="primary"/>
        </p>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
      </>
    );
  }
}


class ExamplePrograms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProgram: "2"
    };
    this.handleChange = this.handleChange.bind(this)
    this.refExample = React.createRef();
  };

  componentDidMount() {
    this.setState({
      selectedProgram: examplePrograms["2"]
    });
    this.props.handleTextChange(examplePrograms["2"]);
  }

  handleChange(event, program) {
    this.setState({
      selectedProgram: event.target.value
    });
    this.props.handleTextChange(program);
  };

  createSelectItems() {
    let items = [];
    items.push(<option key={-1} value="Write your program or select one of the examples.">Select an example</option>);
    for (var key in examplePrograms) {
      items.push(<option key={key} value={examplePrograms[key]}>Example {key}</option>);
    }
    return items
  }

  render() {
    return (
      <Form.Control as="select" size="sm" custom value={this.state.selectedProgram}
        onChange={(e) => this.handleChange(e, e.target.value)}
        ref={this.refExample}>
        {this.createSelectItems()}
      </Form.Control>
    )
  }
}

function SelectPreferenceCriterion() {
  return (
    <Container>
      <Row>
        <Button style={{ backgroundColor: '#337ab7', border: '0px' }} size="sm" block>
          Pref. Criterion
        </Button>
      </Row>
    </Container>
  )
}

class AnalyzeProgramButton extends React.Component {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.setResponse = this.setResponse.bind(this);
    this.AnalyzeButtonRef = React.createRef();
    this.handleModalChange = this.handleModalChange.bind(this);
  }

  setResponse(response) {
    this.props.handleResponse(response);
  }

  handleModalChange(value, msg){
    this.props.handleModalChange(value, msg);
  }

  componentDidMount() {
    this.AnalyzeButtonRef.current.click();
  }

  parseProgram(program){
    let newProgram = ''
    const rules = program.split(/\r?\n/);
    rules.map((rule)=>{
      if(!(rule.includes('<-') || rule.includes('-<'))){
        if(!rule.includes('use_criterion') && rule !== ''){
          newProgram = newProgram + rule.replace('.','<- true.') + '\n';
        }else{
          newProgram = newProgram + rule + '\n';
        }
      }
      else{
        newProgram = newProgram + rule + '\n';
      }
    });
    return newProgram;
  }

  handleOnClick() {
    let self = this;
    this.handleModalChange(true, 'Analyzaing program...');
    let delpProgram = this.props.program;
    let parserProgram = self.parseProgram(delpProgram);
    let formData = new FormData();
    formData.append('delp', parserProgram);
    formData.append('version', '2018');
    formData.append('action', 'makeDelp');
    // Show a loader?
    axios.post(URLtoCore, formData)
      .then(function (response) {
        //console.log("Core Response: ", response.data);
        self.setResponse(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Button style={{ backgroundColor: '#337ab7', border: '0px' }} size="md" block onClick={this.handleOnClick} ref={this.AnalyzeButtonRef}>
        Analyze DeLP
      </Button>
    )
  }
}

class ProgramMenu extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  };
  handleChange(optionValue) {
    this.props.handleTextChange(optionValue)
  };

  render() {
    return (
      <div>
        <Row>
          <Col md="6"><ExamplePrograms handleTextChange={this.handleChange} /></Col>
          <Col md="6"><Button style={{ backgroundColor: '#337ab7', border: '0px' }} size="sm" block>Load</Button></Col>
        </Row>
        <Row style={{ marginTop: "3px" }}>
          <Col md="12"><Generators showGeneratedProgram={this.handleChange} /></Col>
          {/* <Col md="6"><SelectPreferenceCriterion /></Col> */}
        </Row>
      </div>
    )
  }
}

class TextAreaProgram extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleTextChange(e.target.value)
  }

  render() {
    return (
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" style={textAreaProgramStyle} spellCheck="false" value={this.props.value} onChange={this.handleChange} />
      </Form.Group>
    )
  }
}

class AppDeLP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delpProgram: examplePrograms["2"],
      coreResponse: '',
      dGraph: '',
      trees: '',
      selectedArgument: '',
      delpSemantic: '',
      modalInfo:{
        visible: false,
        msg: ''
      }
    };
    this.handleProgramChange = this.handleProgramChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleSelectedArgument = this.handleSelectedArgument.bind(this);
    this.handleModalChange = this.handleModalChange.bind(this);
  }

  componentDidMount(){
    console.log("DidMount");
  }

  handleModalChange(value, msg){
    this.setState({modalInfo:{
      visible: value,
      msg: msg
    }});
  }

  handleProgramChange(value) {
    this.setState({ delpProgram: value });
  }

  handleResponse(coreResponse) {
    let structures;
    let trees;
    try{
      structures = generate_graph_structures(coreResponse.dGraph);
      trees = generate_tree_graph_structures(coreResponse.status);
    } catch(error){
      this.handleModalChange(true, 'Program error... Abort.');
      throw new Error("Something went badly wrong!");
    }
    this.setState({
      coreResponse: coreResponse,
      dGraph: {
        argumentsObject: trees[1],
        defeatsObject: structures.defeatsObject,
        defeatsObjectDung: structures.defeatsObjectDung,
        subArgumentsObject: structures.subArgumentsObject
      },
      trees: trees[0],
      selectedArgument: Object.keys(trees[0])[0],
      delpSemantic: trees[2]
    });
    this.props.handleGlobalResponseChange({
      argumentsObjectDung: structures.argumentsObjectDung,
      defeatsObjectDung: structures.defeatsObjectDung,
      argumentsDung: structures.argumentsDung,
      attacksDung: structures.attacksDung,
      delpSemantic: trees[2]
    });
  }

  handleSelectedArgument(selectedArgument) {
    if (selectedArgument !== this.state.selectedArgument) {
      console.log("Selected argument: ", selectedArgument);
      this.setState({
        selectedArgument: selectedArgument
      });
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg="3" style={containersStyleTEST}>
            <label>Program</label>
            <ProgramMenu handleTextChange={this.handleProgramChange} />
            <TextAreaProgram value={this.state.delpProgram}
              handleTextChange={this.handleProgramChange} />
            <AnalyzeProgramButton program={this.state.delpProgram}
              handleResponse={this.handleResponse} 
              handleModalChange={this.handleModalChange}/>
            <ModalDeLP modalInfo={this.state.modalInfo}/>  
          </Col>
          <Col lg="5" style={containersStyleTEST}>
            <VisNetworkDeLPGraph delpGraph={this.state.dGraph}
              handleNotifyArgumentSelected={this.handleSelectedArgument} 
              handleModalChange={this.handleModalChange}/>
          </Col>
          <Col lg="4" style={containersStyleTEST}>
            <VisLibTrees selectedArgument={this.state.trees[this.state.selectedArgument]}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AppDeLP;
