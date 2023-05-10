import React, { Component } from 'react';

import NavbarPage from "../Components/Navbar/Navbar_Page";
import Section from './section';
import Service from "../Components/Service/service";
import AboutUs from "../Components/AboutUs/AboutUs";
import Pricing from "../Components/Pricing/pricing";
//import Team from '../Components/Team/Team';
import Process from "../Components/Process/Process";
//import Testimonials from "../Components/Testimonials/Testimonials"
import GetStart from "../Components/GetStart/GetStart"
import Blog from "../Components/Blog/Blog"
import Contact from "../Components/Contact/Contact";
import Social from "../Components/Social/Social";
import Footer from "../Components/Footer/footer";

class Index9 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navItems : [
                { id: 1 , idnm : "home", navheading: "Home" },
                { id: 2 , idnm : "services", navheading: "Services" },
                { id: 3 , idnm : "features", navheading: "Features" },
                // { id: 4 , idnm : "pricing", navheading: "Pricing" },
                //{ id: 5 , idnm : "team", navheading: "Team" },
                // { id: 6 , idnm : "blog", navheading: "Blog" },
                { id: 7 , idnm : "contact", navheading: "Contact" }

            ],
            navClass : ""
        };
    }

    render() {
        return (
            <React.Fragment>

                {/* Importing Navbar */}
                <NavbarPage navItems={this.state.navItems} navClass={this.state.navClass} />

                {/* section */}
                <Section/>

                {/* services */}
                <Service  sectionClass=""/>

                {/* about us */}
                <AboutUs/>


                {/* pricing */}
                {/* <Pricing/> */}

                {/* team */}
                

                {/* process */}
                <Process/>

                {/* testimonial */}
                {/* <Testimonials/> */}

                {/* get started */}
                <GetStart/>

                {/* blog */}
                {/* <Blog/> */}

                {/* contact */}
                <Contact/>

                {/* social */}
                <Social />

                {/* footer */}
                <Footer/>
            </React.Fragment>
        );
    }
}

export default Index9;