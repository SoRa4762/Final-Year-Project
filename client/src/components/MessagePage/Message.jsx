import React from "react";
import "./message.css";

const Message = ({ own }) => {
  return (
    <>
      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img
            className="messageImg"
            src="https://fsb.zobj.net/crop.php?r=JVWBQrHKa-7db-9Mdq63RmwsY8RpcdH2B4y6tYI8V9kQtzWFp0cXox0XIdkSMrpc7zroK1geIZ2UImYSxM8vsJLX6LlUH-tlFB2RFY9i4QwRbAi1JY05rpwrY2B3speUngoXw4Yh4wXXK0ml7V8Dd4UqlxLXEGXYeu1CNgjmluPjPO0NXwh10Gue6YxLs5Sj6CkazCxT0FsHo84Y"
            alt=""
          />
          <p className="messageText">Hello this is a test message</p>
        </div>
        <div className="messageBottom">1 hour ago</div>
      </div>
    </>
  );
};

export default Message;
