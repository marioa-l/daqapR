import React from "react";
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data"
import Container from 'react-bootstrap/Container'
require("vis-network/dist/dist/vis-network.min.css");

var nodes = new DataSet();

// create an array with edges
var edges = new DataSet();

var data = {
    nodes: nodes,
    edges: edges
};

// Options for Trees Network
var options = {
    edges: {
        smooth: true,
        arrowStrikethrough: false,
        arrows: { from: true }
    },
    layout: {
        randomSeed: 2,
        hierarchical: {
            sortMethod: 'directed'
        }
    },
    physics: {
        enabled: false
    }
};



class VisLibTrees extends React.Component {
    constructor(props) {
        super(props);
        this.network = {};
        this.myTreeNetwork = React.createRef();
        this.updateTree = this.updateTree.bind(this);
    }

    componentDidMount() {
        this.network = new Network(this.myTreeNetwork.current, data, options);
    }

    updateTree(tree) {
        nodes = tree.nodes;
        edges = tree.edges;

        this.network.setData({ nodes: nodes, edges: edges });

    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedArgument !== prevProps.selectedArgument) {
            this.updateTree(this.props.selectedArgument);
        }

    }

    render() {
        return (
            <Container>
                <div style={{backgroundColor:'#EFEFEF', borderRadius: '0px', paddingLeft:'5px',borderStyle:'groove', borderWidth: '0.2px', borderBottom: '0'}}>
                Dialectical Tree
                </div>
                <div ref={this.myTreeNetwork} style={{ height: "86vh", borderStyle:'groove', borderWidth: '0.2px', borderTop: '0' }} />
            </Container>
        )
    }
}

export default VisLibTrees;