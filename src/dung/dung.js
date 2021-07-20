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

class QuerySemantic extends React.Component {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.setResponse = this.setResponse.bind(this);
    this.AnalyzeButtonRef = React.createRef();
  }

  setResponse(response) {
    this.props.handleSemanticCompute(response);
  }

  handleOnClick() {
    let self = this;
    const semantic = this.props.selectedSemantic;
    const semExtensions = this.props.semantics[semantic];
    if (semExtensions.length == 0) {
      let formData = new FormData();
      for (var i = 0; i < this.props.args.length; i++) {
        formData.append('arguments[]', this.props.args[i]);
      }
      for (var i = 0; i < this.props.attacks.length; i++) {
        formData.append('attacks[]', this.props.attacks[i]);
      }
      formData.append('semantics', this.props.selectedSemantic);
      formData.append('solver', this.props.selectedSolver);
      formData.append('action', 'solver');
      //Show a loader?
      axios.post(URLtoDungSolvers, formData)
        .then(function (response) {
          console.log("Solver Response: ", response['data']);
          self.setResponse(response['data'][semantic]);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("Semantics already computed: ", this.props.selectedSemantic);
    }

  }

  render() {
    return (
      <Button style={{ backgroundColor: '#337ab7', border: '0px' }} size="md" block onClick={this.handleOnClick} ref={this.AnalyzeButtonRef}>
        Query
      </Button>
    )
  }
}

class SelectExtension extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExtension: "0"
    };
    this.handleChange = this.handleChange.bind(this)
    this.refExtension = React.createRef();
  };

  handleChange(key, extension) {
    this.setState({
      selectedExtension: key
    });
    this.props.handleChangeExtension( {'id':key, 'extension':extension} );
  };

  createSelectItems(){
    let items = [];
    let extensions = this.props.extensions;
    if (extensions.length !== 0){
      if (Array.isArray(extensions[0])){
        for (var key in extensions){
          items.push(<option key={key} value={extensions[key]}>{String(key + ' -> ' + extensions[key])}</option>); 
        }
      }else{
          items.push(<option key="0" value={extensions}>{String("0" + ' -> ' + extensions)}</option>); 
      }
    }else{
      items.push(<option key="0" value={extensions}>{String("0" + ' -> ' + extensions)}</option>);
    }
    return items
  }

  render() {
    return (
      <Form.Control as="select" size="sm" custom value={this.state['selectedExtension']}
        onChange={(e) => this.handleChange(e.target.key, e.target.value)}
        ref={this.refExtension}>
        {this.createSelectItems()}
      </Form.Control>
    )
  }
}

class SelectSemantic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSemantic: "delp"
    };
    this.handleChange = this.handleChange.bind(this)
    this.refExample = React.createRef();
  };

  handleChange(semantic) {
    this.setState({
      selectedSemantic: semantic
    });
    this.props.handleChangeSemantic(semantic);
  };

  render() {
    return (
      <Form.Control as="select" size="sm" custom value={this.state['selectedSemantic']}
        onChange={(e) => this.handleChange(e.target.value)}
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

class SelectSolver extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedSolver: 'ArgTech'
    };
    this.handleChangeSolver = this.handleChangeSolver.bind(this);
  };

  handleChangeSolver(newSolver){
    this.setState( {selectedSolver: newSolver} );
    this.props.handleChangeSolver(newSolver);
  };

  render(){
    return(
      <Form>
      <label>Select solver:</label>
      <div key={`solvers`} className="mb-3" onChange={(e)=>this.handleChangeSolver(e.target.id)}>
        <Form.Check
          inline
          label="jArgSemSat"
          name="group1"
          type="radio"
          id={`jArgSemSat`}
        />
        <Form.Check
          inline
          label="Arg-Tech"
          name="group1"
          type="radio"
          id={`ArgTech`}
          defaultChecked
        />
      </div>
    </Form>
    )
  }
}

class AppDung extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'dungGraph': { 'nodes': this.props.dungGraph.argumentsObjectDung, 'arcs': this.props.dungGraph.defeatsObjectDung },
      'solverData': { 'args': this.props.dungGraph.argumentsDung, 'attacks': this.props.dungGraph.attacksDung },
      'selectedSemantic': 'delp',
      'semantics': {
        'delp': this.props.dungGraph.delpSemantic,
        'grounded': [],
        'preferred': [],
        'stable': [],
        'semistable': [],
        'allExtensions': []
      },
      'extension': {
        'id':0,
        'extension': this.props.dungGraph.delpSemantic
      },
      'solver': 'ArgTech',
    };
    this.handleChangeSemantic = this.handleChangeSemantic.bind(this);
    this.handleChangeSolver = this.handleChangeSolver.bind(this);
    this.handleExtensionResponse = this.handleExtensionResponse.bind(this);
    this.handleSemanticCompute = this.handleSemanticCompute.bind(this);
  };

  handleChangeSemantic(newSemantic) {
    this.setState({ 'selectedSemantic': newSemantic });
    const extensions = this.state['semantics'][newSemantic];
    console.log(extensions);
    if (extensions.length !== 0){
      if (Array.isArray(extensions[0])){
        this.setState( {'extension':{'id': 0, 'extension':extensions[0]}} );
      }else{
        this.setState( {'extension':{'id': 0, 'extension':extensions}} );
      }
    }
  };

  handleChangeSolver(newSolver){
    this.setState({ 'solver': newSolver });
  }

  handleExtensionResponse(extension) {
    this.setState({ 'extension': {'id': extension['id'],'extension':extension['extension']}} );
  }

  handleSemanticCompute(semanticExtensions){
    const selectedSemantic = this.state['selectedSemantic'];
    var semantics = { ...this.state['semantics']};
    semantics[selectedSemantic] = semanticExtensions;
    this.setState({ semantics });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg='2' style={containersStyleTEST}>
            <label>Select Semantic:</label>
            <SelectSemantic handleChangeSemantic={this.handleChangeSemantic} />
          </Col>
          <Col lg='3' style={containersStyleTEST}>
            <SelectSolver handleChangeSolver={this.handleChangeSolver}/>
          </Col>
          <Col lg='2' style={{ marginTop: '25px' }}>
            <QuerySemantic selectedSemantic={this.state['selectedSemantic']}
                          selectedSolver={this.state['solver']}
                          args={this.state['solverData']['args']}
                          attacks={this.state['solverData']['attacks']}
                          semantics = {this.state['semantics']}
                          handleSemanticCompute={this.handleSemanticCompute}/>
          </Col>
          <Col lg='4' style={{containersStyleTEST}}>
            <label>Select Extension:</label>
            <SelectExtension extensions={this.state['semantics'][this.state['selectedSemantic']]}
                              handleChangeExtension={this.handleExtensionResponse}/>          
          </Col>
        </Row>
        <Row>
          <Col lg="6" style={containersStyleTEST}>
            <VisNetworkDungGraph dungGraph={this.state['dungGraph']} />
          </Col>
          <Col lg="6" style={containersStyleTEST}>
            <VisNetworkDungGraphExtensions dungGraph={this.state['dungGraph']} 
                                           extension={this.state['extension']} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AppDung;
