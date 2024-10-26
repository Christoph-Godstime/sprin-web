import React from "react";
import logo from "../assets/logo.png";

const Logo = ({ width, text }) => {
  return (
    <div className="flex items-end">
      <img className={`${width}`} src={logo} />
      <h4 className={`text-primary font-[600] ${text}`}>prinFare</h4>
    </div>
  );
};

export default Logo;
