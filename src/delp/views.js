import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {Button, FormGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Views extends React.Component{
    constructor(props) {
        super(props);
        this.handleChangeViews = this.handleChangeViews.bind(this);
        this.subArgumentRel = React.createRef();
        this.typesDefeats = React.createRef();
        this.attackTypeInternal = React.createRef();
        this.attackTypeConclusion = React.createRef();
        this.statusArguments = React.createRef();

    }

    handleChangeViews(){
        let settingViews = {
            optionSubArgumentRelation: this.subArgumentRel.current.checked,
            optionTypeDefeater: this.typesDefeats.current.checked,
            optionsAttacksPointsInternal: this.attackTypeInternal.current.checked,
            optionsAttackPointsConclusion: this.attackTypeConclusion.current.checked,
            optionStatusArguments: this.statusArguments.current.checked
        };

        this.props.handleViewsChange(settingViews);

    }

    render() {
        return (
            <div style={{position: 'fixed',zIndex:999}}>
            <Accordion defaultActiveKey="1">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" style={{paddingTop:'0px',
                        backgroundColor:'#7c7c7c', color:'white', paddingBottom:'0px'}}>
                        Options
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <FormGroup>
                            <label style={{color:'#337ab7', fontSize:'20px'}}>-- Views</label>
                            <Form onChange={this.handleChangeViews}>
                                <Form.Check
                                    type='checkbox'
                                    defaultChecked={true}
                                    ref={this.subArgumentRel}
                                    label='Subargument relation'
                                />
                                <Form.Check
                                    type='checkbox'
                                    defaultChecked={true}
                                    ref = {this.typesDefeats}
                                    label='Types of defeat (proper or blocking)'
                                />
                                <label>Attack type:</label>
                                <Form.Check style={{marginLeft:"20px"}}
                                            type='checkbox'
                                            defaultChecked={true}
                                            ref = {this.attackTypeInternal}
                                            label='Internal'
                                />
                                <Form.Check style={{marginLeft:"20px"}}
                                            type='checkbox'
                                            defaultChecked={true}
                                            ref = {this.attackTypeConclusion}
                                            label='Conclusion'
                                />
                                <Form.Check
                                    type='checkbox'
                                    defaultChecked={true}
                                    ref = {this.statusArguments}
                                    label='Status of the arguments'
                                />
                            </Form>
                            </FormGroup>
                            <FormGroup>
                                <label style={{color:'#337ab7', fontSize:'20px'}}>-- DeLP Graph</label>
                                <Row>
                                    <Col>
                                        <Button style={{backgroundColor:'#337ab7', border:'0px'}} size="md" block>Info</Button>
                                    </Col>
                                    <Col>
                                        <Button style={{backgroundColor:'#337ab7', border:'0px'}} size="md" block>Print</Button>
                                    </Col>

                                </Row>
                            </FormGroup>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>
            </div>
        );
    }
}

export default Views;