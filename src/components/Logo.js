import React from "react";
import logo from "../assets/sprin.png";

const Logo = ({ width, text }) => {
  return (
    <div className="flex items-end">
      <img className={`${width}`} src={logo} />
    </div>
  );
};

export default Logo;
