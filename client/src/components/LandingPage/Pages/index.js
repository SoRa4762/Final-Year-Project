import React, { useState } from "react";
// import ContactUs from "../Contact";
import Footer from "../Footer";
import HeroSection from "../HeroSection";
import InfoSection from "../InfoSection";
import { homeObjOne, homeObjTwo, homeObjThree } from "../InfoSection/Data";
import Map from "../BBNearYou/map";
import Navbar from "../Navbar";
import Services from "../Services/index";
import Sidebar from "../Sidebar";

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="Pages">
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeroSection />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <Map />
      <Services />
      <InfoSection {...homeObjThree} />
      <Footer />
    </div>
  );
};

export default Landing;
