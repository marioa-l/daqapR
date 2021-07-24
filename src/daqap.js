import React from 'react'
import Nav from 'react-bootstrap/Nav'
//import { Container, Tabs, Tab, Row, Col } from 'react-bootstrap'
import AppDeLP from './delp/delp'
import AppDung from './dung/dung'

class DAQAP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            argumentsObjectDung: '',
            defeatsObjectDung: '',
            argumentsDung: '',
            attacksDung: '',
            delpSemantic: ''
        };
        this.handleResponse = this.handleResponse.bind(this);
    }

    handleResponse(response) {
        this.setState(response);
    }

    render() {
        return (
            <div>
                <AppDeLP handleGlobalResponseChange={this.handleResponse} />
                <AppDung dungGraph={this.state} />
            </div>
        );
    }
}

export default DAQAP;