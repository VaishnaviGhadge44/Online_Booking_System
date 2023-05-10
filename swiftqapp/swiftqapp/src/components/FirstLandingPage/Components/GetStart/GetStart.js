import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class GetStart extends Component {
  render() {
    return (
      <section className="section section-lg bg-get-start">
        <div className="bg-overlay"></div>
        <Container>
          <Row>
            <Col lg={{ size: 8, offset: 2 }} className="text-center">
              <h1 className="get-started-title text-white">
                Let's Get Started
              </h1>
              <div className="section-title-border mt-4 bg-white"></div>
              <p className="section-subtitle font-secondary text-white text-center pt-4">
                Start your new Journey with us for a better Future and an outstanding Experience.{" "}
              </p>
              <Link 
                to="/login"
                className="btn btn-white waves-effect mt-3 mb-4"
              >
                Get Started <i className="mdi mdi-arrow-right"></i>{" "}
              </Link>
            </Col>
          </Row>
        </Container>
        <div className="wave-effect wave-anim">
            <div className="waves-shape shape-one">
              <div
                className="wave wave-one"
                style={{
                  backgroundImage: `url(/images/wave-shape/wave1.png)`,
                }}
              ></div>
            </div>
            <div className="waves-shape shape-two">
              <div
                className="wave wave-two"
                style={{
                  backgroundImage: `url(/images/wave-shape/wave2.png)`,
                }}
              ></div>
            </div>
            <div className="waves-shape shape-three">
              <div
                className="wave wave-three"
                style={{
                  backgroundImage: `url(/images/wave-shape/wave3.png)`,
                }}
              ></div>
            </div>
          </div>
      </section>
    );
  }
}

export default GetStart;
