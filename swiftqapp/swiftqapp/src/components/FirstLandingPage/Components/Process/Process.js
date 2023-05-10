import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

//Import Section Title
import SectionTitle from "../common/section-title";
import ProcessBox from "./ProcessBox";

class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processes: [
        {
          icon: "pe-7s-date",
          title: "Create a booking",
        },
        {
          icon: "pe-7s-car",
          title: "Visit the booked Service center",
        },
        {
          icon: "pe-7s-tools",
          title: "Get your gadgets repaired",
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <section className="section bg-light">
          <Container>
            <SectionTitle
              title="WORK PROCESS"
            />

            <Row>
              <Col lg={6} className="text-center process-left-icon-1">
                <i className="pe-7s-angle-right"></i>
              </Col>
              <Col lg={6} className="text-center process-left-icon-2">
                <i className="pe-7s-angle-right"></i>
              </Col>
            </Row>
            <Row className="mt-5">
              <ProcessBox processes={this.state.processes} />
              <div className="text-center mx-auto">
              </div>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Process;
