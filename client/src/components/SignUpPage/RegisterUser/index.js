import React from "react";
import SignUp from "./SignUp";
import registerImg from "../../../images/treeSwing.svg";

const index = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-7 my-auto">
          <img
            className="img-fluid w-100"
            src={registerImg}
            alt="registerImg"
          />
        </div>
        <div className="col-md-5">
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default index;
