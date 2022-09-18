import { React, useState } from "react";
import Video from "../../../videos/video2.mp4";
import {
  HeroContainer,
  HeroBG,
  VideoBG,
  HeroContent,
  HeroH1,
  HeroH2,
  HeroBtnWrapper,
  HeroP,
  ArrowRight,
  ArrowForward,
  HeroBtn,
  HeroBtnLink,
} from "./HeroElements";

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };

  const text = {
    color: "#d5212e",
    fontWeight: "bold",
  };

  return (
    <HeroContainer id="home">
      <HeroBG xs md>
        <VideoBG autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBG>
      <HeroContent>
        <HeroH1>
          <span style={text}>Ragat</span> ra Sambandha
        </HeroH1>
        <HeroH2>Saving lives made convenient</HeroH2>
        <HeroP>
          Sign up to help donate blood to those in need or request help if you
          are in need while potentially forming a new relation.
        </HeroP>
        <HeroBtnWrapper>
          <HeroBtn>
            <HeroBtnLink
              to="/signUp"
              onMouseEnter={onHover}
              onMouseLeave={onHover}
            >
              Get Started {hover ? <ArrowForward /> : <ArrowRight />}
            </HeroBtnLink>
          </HeroBtn>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
