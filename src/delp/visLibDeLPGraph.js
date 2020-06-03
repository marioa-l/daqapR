import React from "react";
import * as utils from './utilsDeLP';
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data"
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import VisLibTrees from "./visLibTrees";

require("vis-network/dist/dist/vis-network.min.css");

var nodes = new DataSet();

// create an array with edges
var edges = new DataSet();

var data = {
    nodes: nodes,
    edges: edges
};
// Options for DGgraph Network
var options = {
    nodes: {
        fixed: false,
        scaling: {
            label: true
        }
    },
    edges: {
        length: 300,
        arrowStrikethrough: false

    },
    interaction: {
        hover: true
    },
    physics: {
        solver: 'forceAtlas2Based',
        forceAtlas2Based: {
            springConstant: 0.01,
            centralGravity: 0.005,
            avoidOverlap: 1
        }
    },
    layout: { randomSeed: 2 }

};

var argumentsObject = [];
var subargumentsObject = [];
var defeatsObject = [];
// initialize your network!

function RenderTree(props) {
    if(props.selectedArgument !== ''){
        return(
            <Container fluid>
            <h6>Tree</h6>
            <VisLibTrees data={props}></VisLibTrees>
            </Container>
        )
    }else{
        return <h6>No argument selected</h6>
    }
}

class VisNetworkDeLPGraph extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedArgument:''
        };
        this.myDeLPGraphNetwork = React.createRef();
        this.updateNetwork = this.updateNetwork.bind(this);
        this.loadArguments = this.loadArguments.bind(this);
        this.loadDefeater = this.loadDefeater.bind(this);
        this.loadSubargument = this.loadSubargument.bind(this);
        this.dGraphNetworkEvents = this.dGraphNetworkEvents.bind(this);
        
        this.network = {};
        this.selectedArgument = '';
    }

    dGraphNetworkEvents(){
        let self = this;
        //Here define the associadted events with the network
        this.network.on("click", function (params) {
            let selectedArgument = params.nodes[0];
            if(selectedArgument){
                self.setState({
                    selectedArgument:selectedArgument
                });
            }else{
                self.setState({
                    selectedArgument:''
                })
            }
        });
    }

    componentDidMount(){
        this.network = new Network(this.myDeLPGraphNetwork.current, data, options);
        this.dGraphNetworkEvents();
    }

    loadDefeater(defeater, defeated){
        let defeatType;
        let arcLabel;
        //To set the type of defeat (proper or blocking) Check this!
        defeater['defeaterType'] === 'proper' ? defeatType = true : defeatType = false;

        //To set the type of attack (conclusion or internal)
        defeater['innerPoint'] === defeated.conclusion ? arcLabel = 'C' : arcLabel = 'I';

        //Load the defeats object
        defeatsObject.push({
            'from': utils.getFormatedArgumentBody(defeater['defeat']),
            'to': utils.getFormatedArgumentBody(defeated.id),
            arrows: {
                to: {
                    enabled: true,
                    type: 'arrow'
                }
            },
            'color': {
                color: '#d9534f',
                highlight: 'red',
                hover: 'red'
            },
            'width': 3,
            'label': arcLabel,
            'dashes': defeatType,
            'font': {
                color: 'black',
                size: 18,
                align: 'top'
            }
        });
    }

    loadSubargument(subargument, argument){
        if (subargument !== argument.id) {
            subargumentsObject.push({
                'from': utils.getFormatedArgumentBody(subargument),
                'to': utils.getFormatedArgumentBody(argument.id),
                arrows: {
                    to: {
                        enabled: true,
                        type: 'circle'
                    }
                },
                color: {
                    color: '#5bc0de',
                    highlight: '#5bc0de',
                    hover: '#5bc0de'
                },
                width: 3
            });
        }
    }

    loadArguments(args){
        args.map(argument => {
            let id = Object.keys(argument)[0];
            argumentsObject.push({
                'id': utils.getFormatedArgumentBody(id),
                'label': argument[id].conclusion,
                'font': {
                    color: 'black',
                    size: 28,
                    vadjust: -130,
                    align: 'center'
                },
                'title': utils.getFormatedArgumentBody(argument[id].id),
                'shape': 'triangle',
                'size': '40'
            });
            argument[id].defeats.map(defeater => this.loadDefeater(defeater, argument[id]));
            argument[id].subarguments.map(subargument => this.loadSubargument(subargument, argument[id]));
        })
    }

    updateNetwork(newData){
        console.log("Updating network...");
        argumentsObject =  [];
        subargumentsObject = [];
        defeatsObject = [];
        newData.map(literal => {
                                let key = Object.keys(literal)[0];
                                this.loadArguments(literal[key]);
                                });
        this.network.setData({nodes: argumentsObject, edges:defeatsObject.concat(subargumentsObject)});
        this.setState({
            selectedArgument:''
        });
    }

    componentDidUpdate(prevProps){
        if(this.props.delpGraph !== prevProps.delpGraph){
            this.updateNetwork(this.props.delpGraph.dGraph);
        }
    }

    render(){
        return(
            
                <Row>
                    <Col lg="8">
                    <h6>DeLP Graph</h6>
                        <div ref={this.myDeLPGraphNetwork} style={{height: "84vh", borderTop: "3px solid grey", backgroundColor: "#F4F7FF"}}></div>
                    </Col>
                    <Col lg="4">
                    <RenderTree selectedArgument = {this.state.selectedArgument} 
                                treeCoreResponse = {this.props.delpGraph.status} 
                                argumentsObject = {argumentsObject} 
                                defeatsObject={defeatsObject}/>
                    </Col>
                </Row>
            
            
        )
    }
}


export default VisNetworkDeLPGraph;