import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {Col, Form} from 'react-bootstrap';


const URLtoCore = 'http://localhost/daqapClient/bridge/bridge.php';
const axios = require('axios');

const textAreaProgramStyle = {
  resize: "none",
  fontFamily: "Consolas",
  fontSize: "14px"
}

const paramsForRandomProgramGen2 = {
    "nPosLiterals" : 10,
    "nNegLiterals" : 5,
    "maxStrictLiterals" : 5,
    "nestingLevel": 3,
    "bodyLength" : 3,
    "headPerLiteral" : 4,
    "properDefeatProb" : 0.5
}

const paramsForRandomProgramGen1 = {
    "nPrograms" : 1, //Number of program to generate
    "nLiterals" : 20, //Max number of literals
    "nNegLiterals" : 15, //Max number of negative literals
    "nFacts" : 7, //Max number of facts
    "minNDifHeads" : 4, //Min number of differente heads
    "maxNDifHeads" : 6, //Max number of differente heads,
    "minNDifRules" : 5, //Min number of rules
    "maxNDifRules" : 6, //Max number of rules,
    "maxNStrictsRules" : 5, //Max number of strict rules
    "minNRulesInBody" : 4, //Min number of literals in bodies
    "maxNRulesInBody" : 4, //Max number of literals in bodies
    "maxAssocLevel" : 3 //Association Level
}

class Generator2Form extends React.Component{
  constructor(props){
    super(props);
    this.state={
      program:''
    }
    this.generateClick = this.generateClick.bind(this);
    this.handleGeneratedProgram = this.handleGeneratedProgram.bind(this);
    this.returnProgram = this.returnProgram.bind(this);
    this.getParams = this.getParams.bind(this);
    
    this.inputPosLit = React.createRef();
    this.inputNegLit = React.createRef();
    this.inputMaxSRules = React.createRef();
    this.inputNestingLevel = React.createRef();
    this.inputBodyLentgh = React.createRef();
    this.inputHeads = React.createRef();
    //this.inputPropDefProb = React.createRef();
  }

  handleGeneratedProgram(program){
    this.setState({
      program:program
    });
  }

  returnProgram(){
    this.props.program(this.state.program);
  }

  getParams(){
      return {
        "nPosLiterals": parseInt(this.inputPosLit.current.value),
        "nNegLiterals": parseInt(this.inputNegLit.current.value),
        "maxStrictLiterals": parseInt(this.inputMaxSRules.current.value),
        "nestingLevel": parseInt(this.inputNestingLevel.current.value),
        "bodyLength": parseInt(this.inputBodyLentgh.current.value),
        "headPerLiteral": parseInt(this.inputHeads.current.value),
        "properDefeatProb": 0.5
    };
  }

  generateClick(params){
    let self=this;
    let formData = new FormData();
    params = JSON.stringify(params);
    console.log(params);
    formData.append('params',params);
    formData.append('action','generateDelp2');
    // Show a loader?
    axios.post(URLtoCore, formData)
    .then(function (response) {
      if(response.data === 0){
        console.log("Error to generate program");
        self.handleGeneratedProgram("Error to generate program");
      }else if(response.data === 1){
        console.log("Timeout to generate program");
        self.handleGeneratedProgram("Timeout to generate program");
      }else{
        //console.log(response.data);
        let program = response.data.replace(/\[\]']/g,'').replace(/(\., )/g,".\n");
        self.handleGeneratedProgram(program);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  render(){
    return(
        <Form>
        <Form.Row>
            <Form.Group as={Col} sm={3} controlId="formGridParams">
            <h4>Params:</h4>
            <Form.Row>
              <Form.Group as={Col} sm={6}>
              
              <Form.Label>Literals:</Form.Label>
            <Form.Control size="sm" type="number" placeholder="Max number" ref={this.inputPosLit} min="1" step="1"/>
            
              </Form.Group>
              <Form.Group as={Col} sm={6}>
              <Form.Label>~Literals:</Form.Label>
            <Form.Control size="sm" type="number"  placeholder="Max number" ref={this.inputNegLit} min="1" step="1"/>
              </Form.Group>
            </Form.Row>
            <Form.Label>Strict Rules:</Form.Label>
            <Form.Control size="sm" type="number"  placeholder="Max number of strict rules" ref={this.inputMaxSRules} min="1" step="1"/>
            <Form.Label>Nesting Level:</Form.Label>
            <Form.Control size="sm" type="number"  placeholder="Association level" ref={this.inputNestingLevel} min="1" step="1"/>
            <Form.Label>Bodies:</Form.Label>
            <Form.Control size="sm" type="number"  placeholder="Association level" ref={this.inputBodyLentgh} min="1" step="1"/>
            <Form.Label>Heads:</Form.Label>
            <Form.Control size="sm" type="number"  placeholder="Association level" ref={this.inputHeads} min="1" step="1"/>
            
            </Form.Group>
            
            <Form.Group as={Col} sm={9} controlId="formGridProgram">
            <h4>Program:</h4>
            <Form.Control as="textarea" value={this.state.program} spellcheck="false" rows="23" style={textAreaProgramStyle} onChange={(event) => this.handleGeneratedProgram(event.target.value)}/>
            </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col} sm={4}>
        <Button variant="primary" onClick={()=>this.generateClick(this.getParams())}>
            Generate
        </Button>
        <Button variant="primary" onClick={()=>this.generateClick(paramsForRandomProgramGen2)}>
            Random
        </Button>
        </Form.Group>
        <Form.Group as={Col} sm={8}>
        <Button variant="primary" style={{float:"right"}} onClick={this.returnProgram}>
            Ok
        </Button>
        </Form.Group>
        </Form.Row>
        </Form>
    )
  }
}

class Generator1Form extends React.Component{
  constructor(props){
    super(props);
    this.state={
      program:''
    }
    this.generateClick = this.generateClick.bind(this);
    this.handleGeneratedProgram = this.handleGeneratedProgram.bind(this);
    this.returnProgram = this.returnProgram.bind(this);
    this.getParams = this.getParams.bind(this);
    this.inputLit = React.createRef();
    this.inputNLit = React.createRef();
    this.inputFacts = React.createRef();
    this.inputMinHeads = React.createRef();
    this.inputMaxHeads = React.createRef();
    this.inputMinRules = React.createRef();
    this.inputMaxRules = React.createRef();
    this.inputSRules = React.createRef();
    this.inputMinBodyLiterals = React.createRef();
    this.inputMaxBodyLiterals = React.createRef();
    this.inputAssocLevel = React.createRef();
  }

  handleGeneratedProgram(program){
    this.setState({
      program:program
    });
  }

  returnProgram(){
    this.props.program(this.state.program);
  }

  getParams(){
      return {
        "nPrograms": 1, //Number of program to generate
        "nLiterals": parseInt(this.inputLit.current.value), //Max number of literals
        "nNegLiterals": parseInt(this.inputNLit.current.value), //Max number of negative literals
        "nFacts": parseInt(this.inputFacts.current.value), //Max number of facts
        "minNDifHeads": parseInt(this.inputMinHeads.current.value), //Min number of differente heads
        "maxNDifHeads": parseInt(this.inputMaxHeads.current.value), //Max number of differente heads,
        "minNDifRules": parseInt(this.inputMinRules.current.value), //Min number of rules
        "maxNDifRules": parseInt(this.inputMaxRules.current.value), //Max number of rules,
        "maxNStrictsRules": parseInt(this.inputSRules.current.value), //Max number of strict rules
        "minNRulesInBody": parseInt(this.inputMinBodyLiterals.current.value), //Min number of literals in bodies
        "maxNRulesInBody": parseInt(this.inputMaxBodyLiterals.current.value), //Max number of literals in bodies
        "maxAssocLevel": parseInt(this.inputAssocLevel.current.value) //Association Level
    };
  }

  generateClick(params){
    let self=this;
    let formData = new FormData();
    params = JSON.stringify(params);
    formData.append('params',params);
    formData.append('action','generateDelp1');
    // Show a loader?
    axios.post(URLtoCore, formData)
    .then(function (response) {
      if(response.data === 0){
        console.log("Error to generate program");
        self.handleGeneratedProgram("Error to generate program");
      }else if(response.data === 1){
        console.log("Timeout to generate program");
        self.handleGeneratedProgram("Timeout to generate program");
      }else{
        //console.log(response.data);
        let program = response.data.replace(/[\[\]']/g,'').replace(/(\., )/g,".\n");
        self.handleGeneratedProgram(program);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  render(){
    return(
        <Form>
        <Form.Row>
            <Form.Group as={Col} sm={3} controlId="formGridParams">
            <h4>Params:</h4>
            <Form.Row>
              <Form.Group as={Col} sm={6}>
              
              <Form.Label>Literals:</Form.Label>
            <Form.Control size="sm" type="number" placeholder="Max number" ref={this.inputLit} min="1" step="1"/>
            
              </Form.Group>
              <Form.Group as={Col} sm={6}>
              <Form.Label>~Literals:</Form.Label>
            <Form.Control size="sm" type="number"  placeholder="Max number" ref={this.inputNLit} min="1" step="1"/>
              </Form.Group>
            </Form.Row>
            <Form.Label>Facts:</Form.Label>
            <Form.Control size="sm" type="number"  placeholder="Max number of facts" ref={this.inputFacts} min="1" step="1"/>
            <Form.Label>Strict Rules:</Form.Label>
            <Form.Control size="sm" type="number"  placeholder="Max number of strict rules" ref={this.inputSRules} min="1" step="1"/>
            <Form.Label>Association Level:</Form.Label>
            <Form.Control size="sm" type="number"  placeholder="Association level" ref={this.inputAssocLevel} min="1" step="1"/>
            
            <Form.Label>Different Heads:</Form.Label>
            
            <Form.Row>
            
            <Form.Group as={Col} sm={6}>
            <Form.Control size="sm" type="number"  placeholder="Min " ref={this.inputMinHeads} min="1" step="1"/>
            </Form.Group>
            <Form.Group as={Col} sm={6}>
            
            <Form.Control size="sm" type="number"  placeholder="Max " ref={this.inputMaxHeads} min="1" step="1"/>
            </Form.Group>
            </Form.Row>
            <Form.Label>Rules:</Form.Label>
            <Form.Row>
              <Form.Group as={Col} sm={6}>
            <Form.Control size="sm" type="number"  placeholder="Min  " ref={this.inputMinRules} min="1" step="1"/>
              </Form.Group>
              <Form.Group as={Col} sm={6}>
            <Form.Control size="sm" type="number"  placeholder="Max " ref={this.inputMaxRules} min="1" step="1"/>
              </Form.Group>
            </Form.Row>
            <Form.Label>Body Literals:</Form.Label>
            <Form.Row>
              <Form.Group as={Col} sm={6}>
              
            <Form.Control size="sm" type="number"  placeholder="Min " ref={this.inputMinBodyLiterals} min="1" step="1"/>
            
              </Form.Group>
              <Form.Group as={Col} sm={6}>
              
            <Form.Control size="sm" type="number"  placeholder="Max" ref={this.inputMaxBodyLiterals} min="1" step="1"/>
            
              </Form.Group>
            </Form.Row>
            
            </Form.Group>
            
            <Form.Group as={Col} sm={9} controlId="formGridProgram">
            <h4>Program:</h4>
            <Form.Control as="textarea" value={this.state.program} spellcheck="false" rows="23" style={textAreaProgramStyle} onChange={(event) => this.handleGeneratedProgram(event.target.value)}/>
            </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col} sm={4}>
        <Button variant="primary" onClick={()=>this.generateClick(this.getParams())}>
            Generate
        </Button>
        <Button variant="primary" onClick={()=>this.generateClick(paramsForRandomProgramGen1)}>
            Random
        </Button>
        </Form.Group>
        <Form.Group as={Col} sm={8}>
        <Button variant="primary" style={{float:"right"}} onClick={this.returnProgram}>
            Ok
        </Button>
        </Form.Group>
        </Form.Row>
        </Form>
    )
  }
}

function GeneratorsModal(props){
      const [key, setKey] = useState('gen1');

      function handleGenProg(program){
        props.returnedProgram(program);
        props.onHide();
        
      }

      return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" show={props.show} onHide={props.onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              DeLP Programs Generators
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="gen1" title="Generator 1">
                <Generator1Form program={handleGenProg}/>
              </Tab>
              <Tab eventKey="gen2" title="Generator 2">
                <Generator2Form program={handleGenProg}/>
              </Tab>
            </Tabs>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer> */}
        </Modal>
      )
  }
  
  function Generators(props) {
    const [modalShow, setModalShow] = React.useState(false);
    
    function generatedProgram(program){
      props.showGeneratedProgram(program);
    }
    
    return (
      <>
        <Button style={{backgroundColor:'#337ab7', border:'0px'}} size="sm" onClick={() => setModalShow(true)} block>
          Generators
        </Button>
  
        <GeneratorsModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          returnedProgram={generatedProgram}
        />
      </>
    );
  }

export default Generators;