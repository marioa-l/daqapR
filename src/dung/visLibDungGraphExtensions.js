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
function TitleExtension(props){
    const semantic = props['extensionData']['semantic'];
    const extensionIndex = props['extensionData']['id'];
    if (extensionIndex === -1){
        return <label>{semantic.charAt(0).toUpperCase() + semantic.slice(1)} Extensions not comp.</label>
    }else{
        return <label>{semantic.charAt(0).toUpperCase() + semantic.slice(1)} Extension {extensionIndex}</label>
    }
}

class VisNetworkDungGraphExtensions extends React.Component {
    constructor(props) {
        super(props);
        this.myDungGraphNetwork = React.createRef();
        this.updateNetwork = this.updateNetwork.bind(this);
        this.network = {};
        this.handleModalChange = this.handleModalChange.bind(this);
    }

    handleModalChange(value, msg){
        this.props.handleModalChange(value, msg);
    }

    dungGraphNetworkEvents(){
        //let self = this;
        //Here define the associadted events with the network
        this.network.on("click", function (params) {
            let selectedArgument = params.nodes[0];
            if(selectedArgument){
                // To notify when an argument is selected on network
                //self.selectedArgument = selectedArgument;
                //self.notifyArgumentSelected();
            }
        });
        this.network.on("stabilizationIterationsDone", function (params) {
            //console.log("Finish Dung draw");
        });
    }

    componentDidMount() {
        //console.log("Drawing Dung Graph...");
        this.network = new Network(this.myDungGraphNetwork.current, { nodes: this.props.dungGraph.nodes, edges: this.props.dungGraph.arcs }, options);
        this.updateNetworkExtension(this.props.extension);
        this.dungGraphNetworkEvents();

    }

    updateNetwork(newData) {
        //console.log("Updating Dung Graph...");
        this.network.setOptions({ layout: { randomSeed: 2 } });
        this.network.setData({ nodes: newData.nodes, edges: newData.arcs });
    }

    updateNetworkExtension(extension) {
        this.network.setOptions({ layout: { randomSeed: 2 } });
        let nodes = this.props.dungGraph.nodes;
        if (extension['id'] === -1) {
            for (const node of nodes){
                this.network.body.data.nodes.update([{
                    id: node['id'],
                    color: '#97C2FC'
                }]);
            }
            /* nodes.map(node => {
                this.network.body.data.nodes.update([{
                    id: node['id'],
                    color: '#97C2FC'
                }]);
            }) */
        } else {
            for (const node of nodes){
                if (extension['extension'].includes(node['id'])) {
                    this.network.body.data.nodes.update([{
                        id: node['id'],
                        color: '#33FF6B'
                    }]);
                } else {
                    this.network.body.data.nodes.update([{
                        id: node['id'],
                        color: '#ff6666'
                    }]);
                }
            }
            /* nodes.map(node => {
                if (extension['extension'].includes(node['id'])) {
                    this.network.body.data.nodes.update([{
                        id: node['id'],
                        color: '#33FF6B'
                    }]);
                } else {
                    this.network.body.data.nodes.update([{
                        id: node['id'],
                        color: '#ff6666'
                    }]);
                }
            }) */
        }
        this.handleModalChange(false, '');
    }

    componentDidUpdate(prevProps) {
        if (this.props.dungGraph !== prevProps.dungGraph) {
            this.updateNetwork(this.props.dungGraph);
        }
        if (this.props.extension !== prevProps.extension) {
            this.updateNetworkExtension(this.props.extension);
        }
        this.network.redraw();
    }

    render() {
        return (
            <div style={{borderStyle:'dotted'}}>
                <TitleExtension extensionData={this.props.extension}/>
                <div ref={this.myDungGraphNetwork} style={{ height: "80vh" }} />
            </div>
        )
    }
}


export default VisNetworkDungGraphExtensions;
