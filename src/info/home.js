import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import sectionProgram from "./sectionProgram.png";
import sectionLegend from "./legend.png";
import sectionDeLPGraph from "./sectionDelpGraph.png";
import sectionTree from "./sectionTree.png"
import sectionTree2 from "./sectionTree2.png"
import sectionView1 from "./sectionView1.png"
import sectionView2 from "./sectionView2.png"
import sectionView3 from "./sectionView3.png"
import sectionView4 from "./sectionView4.png"
import sectionForDungGraph from "./sectionForDungGraph.png"
import sectionForDungExtension from "./sectionForDungExtension.png"

function HomeComponent() {
  return (
    <Container>
      <h2 style={{ textAlign: 'center', paddingTop: '15px' }}>Defeasible Argumentation Query Answering Platform (DAQAP)</h2>
      <p style={{ textAlign: 'justify', fontStyle: 'italic', paddingTop: '15px' }}>DAQAP is a web platform for
        Defeasible Argumentation Query Answering, which offers a visual interface that facilitates the analysis of the argumentative process defined in
        the Defeasible Logic Programming (DeLP) formalism.</p>
      <p style={{ textAlign: 'justify' }}>
        This tool intends to present graph that show the interaction betweent the arguments generated from a DeLP program. It has two sections: the first one focuses on structures obtained from DeLP program, while the second presents the defeat relationships from the point of view of abstract argumentation frameworks, with the possibility of calculating the extensions using Dung's semantics. Using the presented data, the platform provides support for answering queries regarding the states of literals of the input programs [1].
      </p>
      <h3 style={{ textAlign: 'center' }}>Tutorial</h3>
      <Row style={{ borderTop: 'groove 1px', paddingTop: '10px' }}>
        <Col lg='6'>
          <img src={sectionDeLPGraph}></img>
        </Col>
        <Col lg='6'>
          <p style={{ paddingTop: '25%', textAlign: 'justify', color: '#525252' }}>
            The analysis for DeLP programs is handled by the DeLP
            core module, which takes a DeLP program and a preference criterion as inputs, and returns a JSON object that contains information about: (i) the arguments
            that can be constructed from the program, (ii) the defeat relationships, (iii) the set of warranted
            literals as its correspond labeled tree, and (iv) the subargument relationships between arguments. From this data, a DeLP graph is drawn to show all arguments,
            subarguments, defeat relationships, and status of each argument. The DeLP graph allows to analyze the structures and relationships that are generated from the input
            program. In order to see the set of rules that conform a particular argument, the user can hover the mouse pointer over the argument in the graph and it will be
            show (in a tooltip window) the set of rules that comprise it.

          </p>
        </Col>
      </Row>
      <Row style={{ borderTop: 'groove 1px', paddingBottom: '10px', paddingTop: '10px', color: '#525252' }}>
        <Col lg='6'>
          <p style={{ paddingTop: '20%', textAlign: 'justify' }}>
            In the graph, the arguments are represented as triangles with the conclusion of the argument
            at the top and an identifier in its body. The relationships between the arguments can be 'defeat' or 'subargument'. In the particular case of the defeat, DAQAP can show if it is 'proper' or 'blocking' and if the point of attack is to the 'conclusion' or to an 'internal point'. Also, each argument is painted green if its status is 'undefeated' and red if it is a 'defeated' argument (based on its dialectic trees).
          </p>
        </Col>
        <Col lg='6'>
          <img src={sectionLegend} style={{ borderRadius: '15px' }}></img>
        </Col>
      </Row>
      <Row style={{ borderTop: 'groove 1px', paddingTop: '10px', color: '#525252' }}>
        <Col lg='6'>
          <img src={sectionProgram}></img>
        </Col>
        <Col lg='6'>
          <p style={{ paddingTop: '25%', textAlign: 'justify' }}>
            This interface component is the one that allows the loading of the delp program to be analyzed. For this there are three options: enter the program rules in the text area, load some of the preloaded examples (through the selector), or load a delp program from the pc (click 'Load'). Once the program is loaded, click on 'Analyze DeLP' for the platform to analyze the program and generate the structures to be plotted.

            The format for strict rules is 'Head &lt;- Body.', for defeasible rules is 'Head &gt;- Body.'  and for the facts is 'Fact.'.

            The preference criteria is specified with 'use_criterion(more_specific)'. If this statement is removed, all attack relationships are considered defeats.
          </p>
        </Col>
      </Row>
      <Row style={{ borderTop: 'groove 1px', paddingTop: '10px' }}>
        <Col lg='6'>
          <p style={{ paddingTop: '35%', textAlign: 'justify', color: '#525252' }}>
            In addition to the graph,  it is also possible to visualize the dialectical tree
            generated for each argument. Here, it is also possible to distinguish between the 'proper' and
            'blocking' defeat relationships.
          </p>
        </Col>
        <Col lg='6'>
          <Row>
            <Col lg='6'><img src={sectionTree}></img></Col>
            <Col lg='6'>
              <img src={sectionTree2} style={{ width: "29vh", paddingTop: '50%' }}></img>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ borderTop: 'groove 1px', paddingTop: '10px' }}>
        <Col lg='6'>
          <Row>
            <Col lg='6'><img src={sectionView1} style={{ width: "30vh", height: "30vh" }}></img></Col>
            <Col lg='6'><img src={sectionView2} style={{ width: "30vh", height: "30vh" }}></img></Col>
          </Row>
          <Row>
            <Col lg='6'><img src={sectionView3} style={{ width: "30vh", height: "30vh" }}></img></Col>
            <Col lg='6'><img src={sectionView4} style={{ width: "30vh", height: "30vh" }}></img></Col>
          </Row>
        </Col>
        <Col lg='6'>
          <p style={{ paddingTop: '25%', textAlign: 'justify', color: '#525252' }}>
            The interface is capable of showing all arguments generated from the
            DeLP program, the defeat and subargument relationships, and the status of
            each argument in a single graph called the DeLP graph. By default, all of this
            data is drawn; however, since for larger programs this can generate very saturated
            graphs that are difficult to analyze, we developed a set of different views that can
            be configured through the “Views” panel. These views allow to hide certain
            information, reducing the connections or hiding the final status of the arguments,
            so the user can focus on the aspect that is most important to them.
          </p>
        </Col>
      </Row>
      <Row style={{ borderTop: 'groove 1px', paddingTop: '10px' }}>
        <Col lg='6'>
          <p style={{ paddingTop: '25%', textAlign: 'justify', color: '#525252' }}>
            DAQAP also allows to analyze the generated DeLP
            graph by considering it as an abstract argumentation framework, which is essentially a directed graph in which the arguments are represented by the nodes
            and the attack relation is represented by the arcs. It is also possible to calculate
            and display different semantics (grounded, stable, preferred and semistable) for
            the graph. In DeLP, an attack only succeeds
            as a defeat if the attacked argument is not preferred to the attacking argument.
            Therefore, this defeat relation is used as the binary relation in the Dung
            framework. Here, to create the Dung graph the classical components are used, i.e., the
            arguments are represented by nodes and the attack relations are represented by arcs.
          </p>
        </Col>
        <Col lg='6'>
          <img src={sectionForDungGraph}></img>
        </Col>
      </Row>
      <Row style={{ borderTop: 'groove 1px', paddingTop: '10px' }}>
        <Col lg='6'>
          <img src={sectionForDungExtension}></img>
        </Col>
        <Col lg='6'>
          <p style={{ paddingTop: '25%', textAlign: 'justify', color: '#525252' }}>
            From the generated Dung graph, the following semantics can
            be calculated: 'grounded', 'preferred', 'stable' and 'semistable'. The calculated extensions are plotted in another graph to the right of the Dung framework. The
            calculation of these semantics is done through the Arg-Tech solver, which
            is provided as a Web service. Under the generated Dung graph, the semantics that can be calculated are
            shown; when selecting any of them, the query is made to the Arg-Tech
            Web service and the result is shown in another graph to the right of the first
            one. Once the extensions of a semantics are calculated, it is possible to select any of them to graph the nodes that belong to it (painted in green) and those that do not belong to it (painted in red.)

          </p>
        </Col>
      </Row>
      <p style={{ textAlign: 'justify', fontStyle: 'italic', paddingTop: '15px' }}>[1] - Leiva, M. A., Simari, G. I., Gottifredi, S., García, A. J., & Simari, G. R. (2019, June). DAQAP: defeasible argumentation query answering platform. In International Conference on Flexible Query Answering Systems (pp. 126-138). Springer, Cham.</p>
    </Container>

  )
}

export default HomeComponent;
