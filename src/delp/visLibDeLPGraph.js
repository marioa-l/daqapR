import React from "react";
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data"
import Views from "./views";

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
        this.defineView = this.defineView.bind(this);
        this.network = {};
        this.handleModalChange = this.handleModalChange.bind(this);
    }

    handleModalChange(value, msg){
        this.props.handleModalChange(value, msg);
      }

    defineView(viewsSetting){
        let adaptedDefeatsObject = JSON.parse(JSON.stringify(this.props.delpGraph.defeatsObject));
        let adaptedArgumentsObject = JSON.parse(JSON.stringify(this.props.delpGraph.argumentsObject));

        if ((viewsSetting.optionsAttacksPointsInternal || viewsSetting.optionsAttackPointsConclusion) &&
            !(viewsSetting.optionsAttacksPointsInternal && viewsSetting.optionsAttackPointsConclusion)) {
            if (viewsSetting.optionsAttacksPointsInternal) {
                adaptedDefeatsObject = adaptedDefeatsObject.filter(element => element.label === 'I');
            } else {
                adaptedDefeatsObject = adaptedDefeatsObject.filter(element => element.label === "C");
            }
        } else {
            if (!(viewsSetting.optionsAttacksPointsInternal && viewsSetting.optionsAttackPointsConclusion)) {

                adaptedDefeatsObject.forEach(function (element) { delete element.label });

            }

        }

        if (!viewsSetting.optionTypeDefeater) {
            adaptedDefeatsObject.forEach(function (element) { delete element.dashes });
            adaptedDefeatsObject.forEach(function (element) {
                element.color = {
                    color: '#97C2FC',
                    highlight: '#97C2FC',
                    hover: '#97C2FC'
                };
            });
        }

        let subsArg = [];
        if (viewsSetting.optionSubArgumentRelation) {
            subsArg = this.props.delpGraph.subArgumentsObject;
        }

        if(!viewsSetting.optionStatusArguments){
            adaptedArgumentsObject.forEach(function (element) {
                delete element.color
            });
        }

        let newDefeatsObject = {
            argumentsObject: adaptedArgumentsObject,
            defeatsObject: adaptedDefeatsObject,
            subArgumentsObject: subsArg
        };

        this.updateNetwork(newDefeatsObject);
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
        this.network.on("stabilizationIterationsDone", function (params) {
            self.handleModalChange(false, '');
        });
    }

    componentDidMount(){
        this.network = new Network(this.myDeLPGraphNetwork.current, data, options);
        this.network.setOptions({ layout: { randomSeed: 2 } });
        this.dGraphNetworkEvents();
    }

    updateNetwork(newData){
        //console.log("Updating network...");
        this.network.setOptions({ layout: { randomSeed: 2 } });
        this.network.setData({nodes: newData.argumentsObject, edges:newData.defeatsObject.concat(newData.subArgumentsObject)});

    }

    componentDidUpdate(prevProps){
        if(this.props.delpGraph !== prevProps.delpGraph){
            this.updateNetwork(this.props.delpGraph);
        }
    }

    render(){
        return(
            <div style={{borderStyle:'dotted'}}>
            <label>DeLP Graph
            <Views handleViewsChange = {this.defineView}/>
            </label>
                <div ref={this.myDeLPGraphNetwork} style={{height: "86vh"}}/>
            </div>
        )
    }
}


export default VisNetworkDeLPGraph;
