import React, { Component, createRef } from "react";
import * as utils from './delp/utilsDeLP';
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data"
import Container from "react-bootstrap/Container";

require("vis-network/dist/dist/vis-network.min.css");

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


class VisNetwork extends React.Component{
    constructor(props){
        super(props);
        this.updateNetwork = this.updateNetwork.bind(this);
        this.loadArguments = this.loadArguments.bind(this);
        this.loadDefeater = this.loadDefeater.bind(this);
        this.loadSubargument = this.loadSubargument.bind(this);
        this.network = {};
    }

    componentDidMount(){
        this.network = new Network(this.refs.myRef, data, options);
        //Here define the associadted events with the network
    }

    loadDefeater(defeater, defeated){
        let defeatType;
        let arcLabel;
        //To set the type of defeat (proper or blocking) Check this!
        defeater['defeaterType'] == 'proper' ? defeatType = true : defeatType = false;

        //To set the type of attack (conclusion or internal)
        defeater['innerPoint'] == defeated.conclusion ? arcLabel = 'C' : arcLabel = 'I';

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
        if (subargument != argument.id) {
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
    }

    componentDidUpdate(prevProps){
        if(this.props.delpGraph !== prevProps.delpGraph){
            this.updateNetwork(this.props.delpGraph.dGraph);
        }
    }

    render(){
        return(
            <div ref="myRef" style={{height: "84vh", borderTop: "3px solid grey", backgroundColor: "#F4F7FF"}}></div>
        )
    }
}


export default VisNetwork