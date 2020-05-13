import React, { Component, createRef } from "react";
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data"
import Container from "react-bootstrap/Container";


var nodes = new DataSet([
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
]);

// create an array with edges
var edges = new DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5}
]);

var data = {
    nodes: nodes,
    edges: edges
};
var options = {};

// initialize your network!


class VisNetwork extends React.Component{
    constructor(props){
        super(props);
        this.state = {delpGraph: props.delpGraph};
    }

    componentDidMount(){
            var network = new Network(this.refs.myRef, data, options);
    }

    render(){
        return(
            <Container ref="myRef" style={{height: "70vh", border: "3px solid grey"}} fluid></Container>
        )
    }
}


export default VisNetwork