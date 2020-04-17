import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'


const containersStyleTEST = {
  border:"0px solid blue"
}

const rowStyleButtonsTEST = {
  marginTop:"2px"
}

const textAreaProgramStyle = {
    resize: "none",
    fontFamily: "Consolas",
    fontSize: "18px",
    height: "40vh",
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
        <Col>
        <Form.Control as="select" size="sm" custom>
          <option>More Specific</option>
          <option>Priorities Rules</option>
          <option>Labeled</option>
        </Form.Control>
        </Col>
        <Col>
          <Button variant="secondary" size="sm" block>
            Define
          </Button>
        </Col>
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
          <Col md="2" style={containersStyleTEST}>
            <Row ><label>Examples</label></Row>
            <Row style={rowStyleButtonsTEST}><label>Load</label></Row>
            <Row style={rowStyleButtonsTEST}><label>Generate</label></Row>
            <Row style={rowStyleButtonsTEST}><label align="center">Pref. Crit.</label></Row>
          </Col>
          <Col md="10" style={containersStyleTEST}>
            <Row><ExamplePrograms/></Row>
            <Row><Button variant="info" size="sm" block style={rowStyleButtonsTEST}>Load</Button>{' '}</Row>
            <Row><Button variant="info" size="sm" block style={rowStyleButtonsTEST}>Generate</Button>{' '}</Row>
            <Row style={rowStyleButtonsTEST}><SelectPreferenceCriterion /></Row>
          </Col>
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

function App() {
  return (
    <Container fluid>
      <Row>
        <Col lg="4" style={{border:"0px solid red"}}>
          <h4 >Programs</h4>
          <ProgramMenu/>
          <AnalyzeProgramButton style={{marginTop:"2px"}}/>
          <TextAreaProgram/>
        </Col>
        <Col lg="8" style={{border:"0px solid blue"}}><h4>DGraph</h4></Col>
      </Row>
      <Row>
        <Col>
          <TablesOfArguments/>
        </Col>
        <Col>
          <TablesOfArguments/>
        </Col>
      </Row>
    </Container>
  )
}

export default App;
