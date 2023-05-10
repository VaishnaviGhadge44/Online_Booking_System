import React, { Component } from "react";
import { Container, Row } from "reactstrap";

//Import Section Title
import SectionTitle from "../common/section-title";
import ServiceBox from "./services-box";

class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services1: [
        {
          icon: "pe-7s-global",
          title: "User Friendly",
          desc:
            "Free from complexity and easy to understand for the customers to use our platform. Along with that we are providing the customers access to the nearest service centers so that they do not have to worry about the distance to get the best services.",
        },
        {
          icon: "pe-7s-users",
          title: "Expert Technicians",
          desc:
            "The Service centers on our platform have recruited skilled engineers as Technicians. They are expert in motherboard Chip Level Repairing to all.",
        },
        {
          icon: "pe-7s-headphones",
          title: "Easy Communication",
          desc:
            "get resulution for your service on your finger tips by raising a issue and by chat with service center team without visiting the service center",
        },
      ],
      services2: [ 
        {
          icon: "pe-7s-date",
          title: "Book Service Center",
          desc:
            "Our platform allows the customers to book any service center near them to get their electronics repaired at the earliest.",
        },
        {
          icon: "pe-7s-help1",
          title: "Ticket Resolution Service",
          desc:
            "Our platform also allows the customers to create a ticket if one does not want to visit the service center and want to get their issue resolved by having a conversation with the service center technicians.",
        },
        {
          icon: "pe-7s-timer",
          title: "24x7 Support",
          desc:
            "Our platform provides 24x7 customer support service, if any customer or service center is having an issue with their bookings or the application , they can contact us anytime.",
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <section className={"section " + this.props.sectionClass} id="services">
          <Container>
            {/* section title */}
            <SectionTitle
              title="Our Services"
              desc="We provide an easy solution for the customers to access the Service center services without having to wait in the queues. Our application also helps the Service centers to easly manage the customers, expand their business and provide better services."
            />

            <Row className="mt-4">
              {/* services box */}
              <ServiceBox services={this.state.services1} />
            </Row>

            <Row className="mt-4">
              {/* service box */}
              <ServiceBox services={this.state.services2} />
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Process;
