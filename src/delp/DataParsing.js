import * as utils from "./utilsDeLP";

// Global structures
let argumentsObject = [];
let subargumentsObject = [];
let defeatsObject = [];

// Build the Defeats object for the DeLP Graph
function load_defeaters(defeater, defeated) {
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

// Build the SubArguments object for the DeLP Graph
function load_subarguments(subargument, argument) {
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

// Build the Arguments Object for the DeLP Graph
function load_arguments(args) {
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
        argument[id].defeats.map(defeater => load_defeaters(defeater, argument[id]));
        argument[id].subarguments.map(subargument => load_subarguments(subargument, argument[id]));
    })
}

// This function take the DeLP Core response and generate
// the structures to draw the DeLP Graph
export function generate_graph_structures(jsonCoreResponseDGraph) {
    console.log("Parsing DeLP Core response (DGraph)...")
    argumentsObject = [];
    subargumentsObject = [];
    defeatsObject = [];

    jsonCoreResponseDGraph.map(literal => {
        let key = Object.keys(literal)[0];
        load_arguments(literal[key]);
    });

    return {
        'argumentsObject': argumentsObject,
        'subArgumentsObject': subargumentsObject,
        'defeatsObject': defeatsObject
    };
}

/////////////////////
// For tree graphs //
/////////////////////

// Global structures
let trees = {}
let treesGlobal = {}

// To get the type of a defeat relation
function get_type_defeat(argument, defeater){
    let typeDefeat = defeatsObject.find(defeat => defeat.from === utils.getFormatedArgumentBody(defeater) && defeat.to === utils.getFormatedArgumentBody(argument));
    return typeDefeat.dashes;
}

// Returns all children of a parent in the tree structure
function get_childs(parent, list){
    let childs = [];
    for (var count = 0; count < list.length; count++) {
        if (list[count][2] === parent) {
            childs.push(list[count]);
        }
    }
    return childs;
}

// Return the state of the root
function get_labeled_tree(current, tree, obj) {
    let childs = get_childs(current, tree);
    if (childs.length === 0) {
        //leaves nodes
        return "U";
    } else {
        var tempObj = [];
        //intermediate nodes
        for (var children = 0; children < childs.length; children++) {

            let estado = get_labeled_tree(childs[children][3], tree, obj);
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
            return "D";
        } else {
            return "U";
        }

    }
}


// Function to build the global trees structure (intern)
function build_trees_global(status) {
    let trees, roots, lines, tempLines, obj, lit, estado = "";
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
                estado = get_labeled_tree(root[1], tempLines, obj); // Return the state of the root
                treesGlobal[utils.getFormatedArgumentBody(root[0])] = {
                    'id': root[1],
                    'status': estado,
                    'tree': obj
                }
            }
            tempLines = tempLines.filter(x => !obj.indexOf(x) > -1);
            obj = [];

        }
    }
}

// Return the dialectical tree of a particular argument
function get_dialectical_tree(root) {
    let nodes = [];
    let edges = [];
    let color, typeDefeat, conclusion;

    if(treesGlobal[root].status === "U"){
        color = '#33FF6B';
    } else {
        color = '#ff6666';
    }

    conclusion = argumentsObject.find(element => element.id === utils.getFormatedArgumentBody(root));
    //Add the root of the tree
    nodes.push({
        'id': treesGlobal[root].id,
        'label': conclusion.label,
        'title': root,
        'shape': 'triangle',
        'size': 40,
        'font':{
            vadjust: -130,
            size: 28,
            color: 'black'
        },
        'color': color
    });

    let lines = treesGlobal[root].tree;
    for (let count = 0; count < lines.length; count++) {
        if (!utils.valueExistsinObjectArray(nodes, lines[count][0][3])) {
            conclusion = argumentsObject.find(element => element.id === utils.getFormatedArgumentBody(lines[count][0][1]));
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
        typeDefeat = get_type_defeat(lines[count][0][0], lines[count][0][1]);
        edges.push({
            from: lines[count][0][2],
            to: lines[count][0][3],
            width: 3,
            'dashes': typeDefeat
        });
    }

    return {
        'nodes': nodes,
        'edges': edges
    };
}

// This function tale the DeLP Core response and generate
// the structures to draw the tree graphs
export function generate_tree_graph_structures(jsonCoreResponseStatus) {
    console.log("Parsing DeLP Core response (Trees)...");
    treesGlobal = {};
    trees = {};

    // Build global trees structure
    build_trees_global(jsonCoreResponseStatus);

    // Build the structures to graph the dialectical trees
    for (const [root,] of Object.entries(treesGlobal)) {
        trees[root] = get_dialectical_tree(root);
    }

    return trees;
}

