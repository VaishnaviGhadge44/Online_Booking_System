import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { BsFacebook,BsTwitter,BsLinkedin,BsGoogle } from "react-icons/bs";

class Social extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="contact-social bg-light">
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <ul className="list-inline social mt-4">
                  <li className="list-inline-item">
                    <Link to="#" className="social-icon">
                      <BsFacebook/>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" className="social-icon">
                      <BsTwitter/>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" className="social-icon">
                      <BsLinkedin/>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" className="social-icon">
                      <BsGoogle/>
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col lg={3} className="mt-4">
                <p className="contact-title">
                  <i className="pe-7s-call"></i> &nbsp;+91 9028405072
                </p>
              </Col>
              <Col lg={3} className="mt-4 text-right">
                <p className="contact-title">
                  <i className="pe-7s-mail-open"></i>&nbsp; swiftQSol@info.com
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Social;
