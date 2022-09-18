import React from "react";
import Icon1 from "../../../images/expense.svg";
import Icon2 from "../../../images/currentLocation.svg";
import Icon3 from "../../../images/gifts.svg";
import {
  ServicesCard,
  ServicesContainer,
  ServicesH1,
  ServicesH2,
  ServicesIcon,
  ServicesP,
  ServicesWrapper,
} from "./ServicesElements";

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Saving Lives</ServicesH2>
          <ServicesP>
            A tiny help from you can cause an ripple effect which in return
            helps save lives of thousands of people
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Versitility</ServicesH2>
          <ServicesP>
            You can use this app no matter where you are and on which device are
            you on
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Reduce Expenses</ServicesH2>
          <ServicesP>
            We help reduce your expense fees and give you free blood donation in
            accordance to your credit score
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
