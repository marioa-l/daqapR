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
      <h2 style={{ textAlign: 'center' }}>Defeasible Argumentation Query Answering Platform (DAQAP)</h2>
      <p style={{ textAlign: 'justify', fontStyle: 'italic' }}>DAQAP is a web platform for
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
          <p>Text for program section</p>
        </Col>
      </Row>
      <Row style={{ borderTop: 'groove 1px', paddingBottom: '10px', paddingTop: '10px'}}>
        <Col lg='6'>
          <p>Text for program legend</p>
        </Col>
        <Col lg='6'>
          <img src={sectionLegend}></img>
        </Col>
      </Row>
      <Row style={{ borderTop: 'groove 1px', paddingTop: '10px' }}>
        <Col lg='6'>
          <img src={sectionProgram}></img>
        </Col>
        <Col lg='6'>
          <p>Text for program section</p>
        </Col>
      </Row>
      <Row style={{ borderTop: 'groove 1px', paddingTop: '10px' }}>
        <Col lg='6'>
          <p>Text for program section</p>
        </Col>
        <Col lg='6'>
          <Row>
            <Col lg='6'><img src={sectionTree}></img></Col>
            <Col lg='6'>
              <img src={sectionTree2} style={{ width: "40vh", paddingTop: '50%'}}></img>
              </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ borderTop: 'groove 1px', paddingTop: '10px' }}>
        <Col lg='6'>
          <Row>
            <Col lg='6'><img src={sectionView1} style={{ width: "40vh", height: "40vh" }}></img></Col>
            <Col lg='6'><img src={sectionView2} style={{ width: "40vh", height: "40vh" }}></img></Col>
          </Row>
          <Row>
            <Col lg='6'><img src={sectionView3} style={{ width: "40vh", height: "40vh" }}></img></Col>
            <Col lg='6'><img src={sectionView4} style={{ width: "40vh", height: "40vh" }}></img></Col>
          </Row>
        </Col>
        <Col lg='6'>
          <p>Text for program legend</p>
        </Col>
      </Row>
      <Row style={{ borderTop: 'groove 1px', paddingTop: '10px' }}>
        <Col lg='6'>
          <p>Text for program section</p>
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
          <p>Text for program section</p>
        </Col>
      </Row>
      <p style={{ textAlign: 'justify', fontStyle: 'italic' }}>[1] - Leiva, M. A., Simari, G. I., Gottifredi, S., García, A. J., & Simari, G. R. (2019, June). DAQAP: defeasible argumentation query answering platform. In International Conference on Flexible Query Answering Systems (pp. 126-138). Springer, Cham.</p>
    </Container>

  )
}

export default HomeComponent;
