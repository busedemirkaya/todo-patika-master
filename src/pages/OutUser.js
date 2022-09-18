import { Button } from "antd";
import React from "react";
import { removeloginState } from "../services";

function OutUser() {
  const onClick = (e) => {
    removeloginState();
    window.location.reload();
  };

  return (
    <div style={{ position: "relative", left: "35%", marginTop: "50px" }}>
        <span style={{marginRight:"25px"}}>Click to log out</span>
        <Button type="primary" onClick={() => onClick()}>
          Log Out
        </Button>
    </div>
  );
}
export default OutUser;
