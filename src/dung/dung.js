import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import VisNetworkDungGraph from './visLibDungGraph'
import VisNetworkDungGraphExtensions from './visLibDungGraphExtensions'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

//const URLtoDungSolvers = 'http://localhost/daqapClient/bridge/callSolver.php';
const URLtoDungSolvers = 'https://hosting.cs.uns.edu.ar/~daqap/bridge/bridge.php';

const axios = require('axios');

const containersStyleTESTDung = {
  marginTop: "5px",
  width: "100%"
}

class ModalDung extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      modalInfo:{
        visible: false,
        msg:''
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

class QuerySemantic extends React.Component {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.setResponse = this.setResponse.bind(this);
    this.AnalyzeButtonRef = React.createRef();
    this.handleModalChange = this.handleModalChange.bind(this);
  }

  handleModalChange(value, msg){
    this.props.handleModalChange(value, msg);
  }

  setResponse(response) {
    this.props.handleSemanticCompute(response);
  }

  handleOnClick() {
    let self = this;
    const semantic = this.props.selectedSemantic;
    const semExtensions = this.props.semantics[semantic];
    if (semExtensions.length === 0) {
      self.handleModalChange(true, 'Consulting semantics to ' + this.props.selectedSolver);
      let formData = new FormData();
      for (var i = 0; i < this.props.args.length; i++) {
        formData.append('arguments[]', this.props.args[i]);
      }
      for (var j = 0; j < this.props.attacks.length; j++) {
        formData.append('attacks[]', this.props.attacks[j]);
      }
      formData.append('semantics', this.props.selectedSemantic);
      formData.append('solver', this.props.selectedSolver);
      formData.append('action', 'consultExtensions');
      //Show a loader?
      axios.post(URLtoDungSolvers, formData)
        .then(function (response) {
          console.log("Solver Response: ", response['data']);
          let extensions = response['data'][semantic];
          if (Array.isArray(extensions[0])) {
            let toNumberFormat = extensions.map((extension) => {
              return extension.map(Number);
            });
            self.setResponse(toNumberFormat);
          } else {
            let toNumberFormat = extensions.map(Number);
            self.setResponse([toNumberFormat]);
          }
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
      <Button style={{ backgroundColor: '#337ab7', border: '0px' , marginTop:'28px'}} size="md" block onClick={this.handleOnClick} ref={this.AnalyzeButtonRef}>
        Query
      </Button>
    )
  }
}

class SelectExtension extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.refExtension = React.createRef();
  };

  handleChange(extension) {
    console.log(extension);
    this.props.handleChangeExtension(extension);
  };

  componentDidUpdate(prevProps) {
    const newExtensions = this.props.extensions;
    if (prevProps['extensions'] !== newExtensions) {
      if (newExtensions.length !== 0) {
        this.handleChange(newExtensions[0]);
      }else{
        this.handleChange([]);
      }
    }
  }

  createSelectItems() {
    let items = [];
    let extensions = this.props.extensions;
    if (extensions.length !== 0) {
      for (var key in extensions) {
        items.push(<option key={key} value={extensions[key]}>{String(key + ':  {' + extensions[key] + '}')}</option>);
      }
    } else {
      items.push(<option key={-1} value={[]}>{String("Not computed")}</option>);
    }
    return items;
  }

  render() {
    return (
      <Form.Control as="select" size="sm" custom
        onChange={(e) =>{
          const in_array = e.target.value.split(',').map(function(item) {
            return parseInt(item, 10);
          });
          this.handleChange(in_array)}}
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
        <option key={1} value="delp">DeLP</option>
        <option key={2} value="complete">Complete</option>
        <option key={3} value="preferred">Preferred</option>
        <option key={4} value="stable">Stable</option>
        <option key={5} value="admissible">Admissible</option>
        {/* <option key={6} value="allSemantics">All Semantics</option> */}
      </Form.Control>
    )
  }
}

class SelectSolver extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSolver: 'ArgTech'
    };
    this.handleChangeSolver = this.handleChangeSolver.bind(this);
  };

  handleChangeSolver(newSolver) {
    this.setState({ selectedSolver: newSolver });
    this.props.handleChangeSolver(newSolver);
  };

  render() {
    return (
      <Form>
        <label>Select solver:</label>
        <div key={`solvers`} className="mb-3" onChange={(e) => this.handleChangeSolver(e.target.id)}>
          <Form.Check
            inline
            label="jArgSemSat"
            name="group1"
            type="radio"
            id={`jArgSemSat`}
            disabled
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
    console.log("Dung Component created...");
    super(props);
    this.state = {
      'dungGraph': { 'nodes': this.props.dungGraph.argumentsObjectDung, 'arcs': this.props.dungGraph.defeatsObjectDung },
      'solverData': { 'args': this.props.dungGraph.argumentsDung, 'attacks': this.props.dungGraph.attacksDung },
      'selectedSemantic': 'delp',
      'semantics': {
        'delp': [this.props.dungGraph.delpSemantic],
        'grounded': [],
        'preferred': [],
        'stable': [],
        'semistable': []
      },
      'extension': {
        'semantic': 'delp',
        'extension': this.props.dungGraph.delpSemantic
      },
      'solver': 'ArgTech',
      'modalInfo': {
        visible: false,
        msg: ''
      }
    };
    this.handleChangeSemantic = this.handleChangeSemantic.bind(this);
    this.handleChangeSolver = this.handleChangeSolver.bind(this);
    this.handleChangeExtension = this.handleChangeExtension.bind(this);
    this.handleSemanticCompute = this.handleSemanticCompute.bind(this);
    this.handleModalChange = this.handleModalChange.bind(this);
  };

  handleModalChange(value,msg){
    this.setState({modalInfo: {
      visible: value,
      msg: msg
    }});
  }

  handleChangeSemantic(newSemantic) {
    this.setState({ 'selectedSemantic': newSemantic });
  };

  handleChangeSolver(newSolver) {
    this.setState({ 'solver': newSolver });
  }

  handleChangeExtension(extension) {
    const selectedSemantic = this.state['selectedSemantic'];
    this.setState({ 'extension': { 'semantic': selectedSemantic, 'extension': extension } });
    //console.log("Semantic: " + selectedSemantic + ' Id: ' + extension['id'] + 'ext: ' + extension['extension']);
  }

  handleSemanticCompute(semanticExtensions) {
    const selectedSemantic = this.state['selectedSemantic'];
    var semantics = { ...this.state['semantics'] };
    semantics[selectedSemantic] = semanticExtensions;
    this.setState({ semantics });
  }

  componentDidUpdate(prevProps) {
    const newDungGrapg = this.props.dungGraph.argumentsDung;
    if (prevProps.dungGraph.argumentsDung !== newDungGrapg){
      this.setState({
        dungGraph: { 'nodes': this.props.dungGraph.argumentsObjectDung, 'arcs': this.props.dungGraph.defeatsObjectDung },
        solverData: { 'args': this.props.dungGraph.argumentsDung, 'attacks': this.props.dungGraph.attacksDung },
        'selectedSemantic': 'delp',
        'semantics': {
          'delp': [this.props.dungGraph.delpSemantic],
          'grounded': [],
          'preferred': [],
          'stable': [],
          'semistable': []
        },
        'extension': {
          'semantic': 'delp',
          'extension': this.props.dungGraph.delpSemantic
        },
        'solver': 'ArgTech',
        'modalInfo': {
          visible: false,
          msg: ''
        }
      })
    }
  }

  render() {
    return (
      <Container fluid style={containersStyleTESTDung}>
        <Row style={{}}>
          <Col lg='2' >
            <label>Select Semantic:</label>
            <SelectSemantic handleChangeSemantic={this.handleChangeSemantic} />
          </Col>
          <Col lg='3'>
            <SelectSolver handleChangeSolver={this.handleChangeSolver} />
          </Col>
          <Col lg='2'>
            <QuerySemantic selectedSemantic={this.state['selectedSemantic']}
              selectedSolver={this.state['solver']}
              args={this.state['solverData']['args']}
              attacks={this.state['solverData']['attacks']}
              semantics={this.state['semantics']}
              handleSemanticCompute={this.handleSemanticCompute} 
              handleModalChange = {this.handleModalChange}/>
              <ModalDung modalInfo={this.state.modalInfo}/>
          </Col>
          <Col lg='4'>
            <label>Select Extension:</label>
            <SelectExtension extensions={this.state['semantics'][this.state['selectedSemantic']]}
              handleChangeExtension={this.handleChangeExtension} />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <VisNetworkDungGraph dungGraph={this.state['dungGraph']} />
          </Col>
          <Col lg="6">
            <VisNetworkDungGraphExtensions dungGraph={this.state['dungGraph']}
              extension={this.state['extension']} handleModalChange={this.handleModalChange}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AppDung;
