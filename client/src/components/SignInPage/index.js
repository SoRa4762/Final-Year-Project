import React from "react";
import SignIn from "./SignIn";
import Image from "../../images/undraw_welcome_re_h3d9.svg";

const index = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-7 my-auto">
          <img className="img-fluid w-100" src={Image} alt="SignInImg" />
        </div>
        <div className="col-md-5">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default index;
