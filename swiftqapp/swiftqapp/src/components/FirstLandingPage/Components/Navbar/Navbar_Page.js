import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
  Container,
  Collapse,
  Button,
} from "reactstrap";

import {Link} from "react-router-dom"
//stickey header
import "./style.css";

class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMenu: false,
    };
  }

  toggle = () => {
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
  };

  render() {
    //Store all Navigationbar Id into TargetID variable(Used for Scrollspy)
    let targetId = this.props.navItems.map((item) => {
      return item.idnm;
    });
    return (
      <React.Fragment>
        <Navbar
              expand="lg"
              fixed="top"
              color="dark"
              // light
            >
{/* <img src={} width={250} style={{padding:"20px"}}/> */}
              <Container>
                
                <NavbarToggler onClick={this.toggle}>
                  <i className="mdi mdi-menu"></i>
                </NavbarToggler>

                <Collapse
                  id="navbarCollapse"
                  isOpen={this.state.isOpenMenu}
                  navbar
                >
                 
                    <Nav navbar  id="mySidenav" >
                      {this.props.navItems.map((item, key) => (
                        <NavItem
                          key={key}
                        >
                          <NavLink href={"#" + item.idnm}>
                            {" "}
                            {item.navheading}
                          </NavLink>
                        </NavItem>
                      ))}
                      
                    </Nav>
                    <Link className="loginLnk" style={{position:"absolute",right:"20px"}} to={"/login"}>
                      Login   
                    </Link>
                </Collapse>
              </Container>
            </Navbar>
      </React.Fragment>
    );
  }
}

export default NavbarPage;
