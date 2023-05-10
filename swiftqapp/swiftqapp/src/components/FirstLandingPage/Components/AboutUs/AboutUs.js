import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class AboutUs extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="section bg-light" id="features">
          <Container>
            <Row className="vertical-content">
              <Col lg={5}>
                <div className="features-box">
                  <h3>
                    A digital web Solution for creating bookings & tickets for the nearest Service centers. 
                  </h3>
                 
                  <ul className="text-muted list-unstyled mt-4 features-item-list">
                    <li className="">We have created an easy to operate design.</li>
                    <li className="">
                      We have skilled team of technicians at the service centers.
                    </li>
                    
                    {/* <li className="">Submit Your Orgnization.</li> */}
                  </ul>
                  {/* <Link
                    to="#"
                    className="btn btn-primary mt-4 waves-effect waves-light"
                  >
                    Learn More <i className="mdi mdi-arrow-right"></i>
                  </Link> */}
                </div>
              </Col>
              <Col lg={7}>
                <div className="features-img features-right text-right">
                  <img
                    src={`images/bookingIcon.jpg`}
                    alt="macbook"
                    className="img-fluid"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default AboutUs;
