import React, { Component } from "react";
import { Container, Row, Col, FormGroup } from "reactstrap";

//Import Section Title
import SectionTitle from "../common/section-title";

class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <section className="section " id="contact">
          <Container>
            {/* section title */}
            <SectionTitle
              title="GET IN TOUCH"
              
            />

            <Row className="text-center">
              <Col lg={12}>
                <div className="mt-4 pt-4">
                  <p className="mt-4">
                    <span className="h5">Office Address:</span>
                    <br />{" "}
                    <span className="text-muted d-block mt-2">
                     IACSD,Sector 29,
                     Behind Akurdi Railway Station,
                     Nigadi Pradhikaran,Akurdi,Pune
                    </span>
                  </p>
                </div>
              </Col>

              {/* <Col lg={4}>
 <div className="mt-4 pt-4">
                  
                  <p className="mt-4">
                    <span className="h5">Office Address 2:</span>
                    <br />{" "}
                    <span className="text-muted d-block mt-2">
                      2467 GT Road <br />
                      Chandigarh, NT 70171
                    </span>
                  </p>
                </div>
              </Col> */}

              <Col lg={12}>
              <div className="mt-4 pt-4">
                  <p className="mt-4">
                    <span className="h5">Working Hours:</span>
                    <br />{" "}
                    <span className="text-muted d-block mt-2">
                      10:00AM To 6:00PM
                    </span>
                  </p>
                </div>
              </Col>
              {/* <Col lg={8}>
                <div className="custom-form mt-4 pt-4">
                  <div id="message"></div>
                  <div name="contact-form" id="contact-form">
                    <Row>
                      <Col lg={6}>
                        <FormGroup className="mt-2">
                          <input
                            required
                            name="name"
                            id="name"
                            type="text"
                            className="form-control"
                            placeholder="Your name*"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={6}>
                        <FormGroup className="mt-2">
                          <input
                            required
                            name="email"
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="Your email*"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <FormGroup className="mt-2">
                          <input
                            required
                            name="subject"
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Your Subject.."
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <FormGroup className="mt-2">
                          <textarea
                            name="comments"
                            id="comments"
                            rows="4"
                            className="form-control"
                            placeholder="Your message..."
                          ></textarea>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} className="text-end">
                        <input
                          type="submit"
                          id="submit"
                          name="send"
                          className="submitBnt btn btn-primary"
                          value="Send Message"
                        />
                        <div id="simple-msg"></div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col> */}
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Features;
