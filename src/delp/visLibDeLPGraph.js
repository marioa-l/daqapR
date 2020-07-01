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

class VisNetworkDeLPGraph extends React.Component{
    constructor(props){
        super(props);
        this.selectedArgument = '';
        this.myDeLPGraphNetwork = React.createRef();
        this.updateNetwork = this.updateNetwork.bind(this);
        this.dGraphNetworkEvents = this.dGraphNetworkEvents.bind(this);
        this.notifyArgumentSelected = this.notifyArgumentSelected.bind(this);
        this.network = {};
    }

    notifyArgumentSelected(){
        this.props.handleNotifyArgumentSelected(this.selectedArgument);
    }

    dGraphNetworkEvents(){
        let self = this;
        //Here define the associadted events with the network
        this.network.on("click", function (params) {
            let selectedArgument = params.nodes[0];
            if(selectedArgument){
                self.selectedArgument = selectedArgument;
                self.notifyArgumentSelected();
            }
        });
    }

    componentDidMount(){
        this.network = new Network(this.myDeLPGraphNetwork.current, data, options);
        this.dGraphNetworkEvents();
    }

    updateNetwork(newData){
        console.log("Updating network...");
        this.network.setData({nodes: newData.argumentsObject, edges:newData.defeatsObject.concat(newData.subArgumentsObject)});
    }

    componentDidUpdate(prevProps){
        if(this.props.delpGraph !== prevProps.delpGraph){
            this.updateNetwork(this.props.delpGraph);
        }
    }

    render(){
        return(
            <div>
            <label>DeLP Graph</label>
            <div ref={this.myDeLPGraphNetwork} style={{height: "84vh"}}/>
            </div>
        )
    }
}


export default VisNetworkDeLPGraph;