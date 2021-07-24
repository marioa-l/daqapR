import React from "react";
import { Network } from "vis-network/peer/esm/vis-network";

require("vis-network/dist/dist/vis-network.min.css");

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

class VisNetworkDungGraph extends React.Component{
    constructor(props){
        super(props);
        this.myDungGraphNetwork = React.createRef();
        this.updateNetwork = this.updateNetwork.bind(this);
        this.network = {};
    }

    
    componentDidMount(){
        this.network = new Network(this.myDungGraphNetwork.current, {nodes:this.props.dungGraph.nodes, edges: this.props.dungGraph.arcs}, options);
        this.network.setOptions({ layout: { randomSeed: 2 } });
        this.network.fit();
    }

    updateNetwork(newData){
        this.network.setOptions({ layout: { randomSeed: 2 } });
        this.network.setData({nodes: newData.nodes, edges:newData.arcs});
        console.log("Dung Graph updated...");
    }

    componentDidUpdate(prevProps){
        if(this.props.dungGraph !== prevProps.dungGraph){
            this.updateNetwork(this.props.dungGraph);
        }
    }

    render(){
        return(
            <div style={{borderStyle:'dotted'}}>
            <label>Dung Graph</label>
                <div ref={this.myDungGraphNetwork} style={{height: "80vh"}}/>
            </div>
        )
    }
}


export default VisNetworkDungGraph;
