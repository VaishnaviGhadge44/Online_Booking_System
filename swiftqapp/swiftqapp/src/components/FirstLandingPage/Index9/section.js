import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import ParticlesComponent from "./Particles"
//Import Particles
// import Particles from "react-particles-js";

//Importing Modal

class Section extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.callModal.bind(this);
  }

  callModal = () => {
    this.refs.child.openModal();
  };

  render() {
    return (
      <React.Fragment>
        <section className="section bg-home vh-100" id="home" >
          <ParticlesComponent/>
          <div className="">
            <div className="">
              <Container className="slidero">
                <Row>
                  <Col
                    lg={{ size: 12}}
                    className="text-white text-center"
                  >
                    <h1 className="home-title">
                      We help You skip the Queue.
                    </h1>
                    <p className="pt-3 home-desc">
                   We provide an easy solution for the customers to access the Service center services without having to wait in the queues. Our application also helps the Service centers to easly manage the customers, expand their business and provide better services.
                    </p>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
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
      </React.Fragment>
    );
  }
}

export default Section;
