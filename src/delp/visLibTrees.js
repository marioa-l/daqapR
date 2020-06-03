import React from "react";
import * as utils from './utilsDeLP';
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data"
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



class VisLibTrees extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            treesGlobal:''
        };
        this.network = {};
        this.myTreeNetwork = React.createRef();
        this.argumentsObject = '';
        this.defeatsObject = '';
        this.selectedArgument = '';

        this.getTypeDefeat = this.getTypeDefeat.bind(this);
        this.getChilds = this.getChilds.bind(this);
        this.getLabeledTree = this.getLabeledTree.bind(this);
        this.updateTree = this.updateTree.bind(this);
    }

    getTypeDefeat(argument, defeater){
        let typeDefeat = this.defeatsObject.find(defeat => defeat.from === utils.getFormatedArgumentBody(defeater) && defeat.to === utils.getFormatedArgumentBody(argument));
        return typeDefeat.dashes;
    }

    getChilds(parent, list){
        let childs = [];
        for (var count = 0; count < list.length; count++) {
            if (list[count][2] === parent) {
                childs.push(list[count]);
            }
        }
        return childs;
    }
    
    getLabeledTree(current, tree, obj) {
        let childs = this.getChilds(current, tree);
        if (childs.length === 0) {
            //leaves nodes
            return "U";
        } else {
            var tempObj = [];
            //intermediate nodes
            for (var children = 0; children < childs.length; children++) {

                let estado = this.getLabeledTree(childs[children][3], tree, obj);
                if (estado === "U") {
                    obj.push([childs[children], "U", '#33FF6B']);
                    tempObj.push([childs[children][3], "U"]);
                } else {
                    obj.push([childs[children], "D", '#ff6666']);
                    tempObj.push([childs[children][3], "D"]);
                }
            }
            var state = "U";

            for (var count = 0; count < tempObj.length; count++) {
                if (tempObj[count][1] === "U") {
                    state = "D";
                    break;
                }
            }

            if (state === "D") {
                //console.log("Current: " + current + "Status: " + state);
                //console.log("Childs: " + tempObj);
                return "D";
            } else {
                //console.log("Current: " + current + "Status: " + state);
                //console.log("Childs: " + tempObj);
                return "U";
            }

        }
    }

    componentDidMount(){
        console.log(this.props);
        let status = this.props.data.treeCoreResponse;
        this.argumentsObject = this.props.data.argumentsObject;
        this.defeatsObject = this.props.data.defeatsObject;
        this.selectedArgument = this.props.data.selectedArgument;
        let trees, roots, lines, tempLines, obj, lit, estado = "";
        let treesGlobal = {};
        for (const [, [, treesAndGuarantedd]] of Object.entries(Object.entries(status))) {
            lit = Object.keys(treesAndGuarantedd)[0]; //The literal (the key for access to its tree)
            trees = treesAndGuarantedd[lit].trees; //All trees associated with the literal
            Array.isArray(trees[0]) ? roots = trees.filter(elem => elem.length === 2) : roots.push(trees);
            //roots = trees.filter(elem => elem.length == 2); //All roots
            //lines = trees.diff(roots); //All lines (whitout roots)
            lines = trees.filter(x => !roots.indexOf(x) > -1);
            tempLines = lines; //Temporal lines (this is for clean the set of all lines)
            obj = [];
            for (const [, [, root]] of Object.entries(Object.entries(roots))) {
                if (root.length !== 0) {
                    estado = this.getLabeledTree(root[1], tempLines, obj); // Return the state of the root
                    treesGlobal[utils.getFormatedArgumentBody(root[0])] = {
                        'id': root[1],
                        'status': estado,
                        'tree': obj
                    }
                }
                tempLines = tempLines.filter(x => !obj.indexOf(x) > -1);
                obj = [];
    
            }
        };
        console.log(treesGlobal);
        this.setState({
            treesGlobal: treesGlobal
        });
        this.network = new Network(this.myTreeNetwork.current, data, options);
    }

    updateTree(root){
        console.log("Updating trees graph...");
        nodes = [];
        edges = [];
        let color, typeDefeat, conclusion;
        this.selectedArgument = root;
        console.log(root);
        if(this.state.treesGlobal[this.selectedArgument].status == "U"){
            color = '#33FF6B';
        } else {
            color = '#ff6666';
        }

        conclusion = this.argumentsObject.find(element => element.id == root);
        //Add the root of the tree
        nodes.push({
            'id': this.state.treesGlobal[this.selectedArgument].id,
            'label': conclusion.label,
            'title': this.selectedArgument,
            'shape': 'triangle',
            'size': 40,
            'font':{
                vadjust: -130,
                size: 28,
                color: 'black'
            },
            'color': color
        });

        let lines = this.state.treesGlobal[this.selectedArgument].tree;
        for (var count = 0; count < lines.length; count++) {
            if (!utils.valueExistsinObjectArray(nodes, lines[count][0][3])) {
                conclusion = this.argumentsObject.find(element => element.id == utils.getFormatedArgumentBody(lines[count][0][1]));
                nodes.push({
                    'id': lines[count][0][3],
                    'label': conclusion.label,
                    'title': utils.getFormatedArgumentBody(lines[count][0][1]),
                    'shape': 'triangle',
                    'color': lines[count][2],
                    'size': 40,
                    'font': {
                        vadjust: -130,
                        size: 28,
                        color: 'black'
                    }
    
                });
            }
            typeDefeat = this.getTypeDefeat(lines[count][0][0], lines[count][0][1]);
            edges.push({
                from: lines[count][0][2],
                to: lines[count][0][3],
                width: 3,
                'dashes': typeDefeat
            });
        };

        this.network.setData({nodes: nodes, edges:edges});

    }

    componentDidUpdate(prevProps){
        if(this.props.data.selectedArgument !== prevProps.data.selectedArgument){
            this.updateTree(this.props.data.selectedArgument);
        }
    }

    render(){
        return(
            <div ref={this.myTreeNetwork} style={{height: "84vh", borderTop: "3px solid grey", backgroundColor: "#F4F7FF"}}></div>
        )
    }
}

export default VisLibTrees;