import React from "react";
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data"

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

// initialize your network!

class VisNetworkDungGraphExtensions extends React.Component{
    constructor(props){
        super(props);
        this.myDungGraphNetwork = React.createRef();
        this.updateNetwork = this.updateNetwork.bind(this);
        this.network = {};
    }

    
    componentDidMount(){
        this.network = new Network(this.myDungGraphNetwork.current, {nodes:this.props.dungGraph.nodes, edges: this.props.dungGraph.arcs}, options);
        this.network.setOptions({ layout: { randomSeed: 2 } });
    }

    updateNetwork(newData){
        console.log("Updating Dung network...");
        this.network.setOptions({ layout: { randomSeed: 2 } });
        this.network.setData({nodes: newData.nodes, edges:newData.arcs});
    }

	updateNetworkExtension(dGraph, extension){
		console.log("Updating extension...");
		this.network.setOptions({layout: {randomSeed:2}});
		extension.map(node=>{
			dGraph.nodes[node]['color']='red';	
		});
		this.network.setData({nodes: dGraph.nodes, edges:dGraph.arcs});
	}	

    componentDidUpdate(prevProps){
        if(this.props.dungGraph !== prevProps.dungGraph){
            this.updateNetwork(this.props.dungGraph);
        }
	    if(this.props.extension !== prevProps.extension){
		    this.updateNetworkExtension(this.props.dungGraph, this.props.extension);
	    }    
	    
    }

    render(){
        return(
            <div>
            <label>Dung Graph</label>
                <div ref={this.myDungGraphNetwork} style={{height: "70vh"}}/>
            </div>
        )
    }
}


export default VisNetworkDungGraphExtensions;
