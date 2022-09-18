import { React, useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import "./topbar.css";
import { Image } from "cloudinary-react";

const Topbar = () => {
  const { authState } = useContext(AuthContext);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          {/* blood bank name? */}
          <span className="logo">{authState.username}</span>
        </div>
        <div className="topRight">
          <Image
            cloudName="soragatrasambandha"
            publicId={authState.profilePicture}
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
