import React from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Logout = () => {
  const handleLogout = () => {
    axios
      .post("http://localhost:8001/api/logout", {}, { withCredentials: true })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <button
      style={{
        background: "none",
        border: "none",
        color: "#069",
        cursor: "pointer",
      }}
      onClick={() => handleLogout()}
    >
      Sign Out
    </button>
  );
};

export default Logout;
