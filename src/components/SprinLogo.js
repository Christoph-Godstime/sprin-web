import React from "react";
import sprinLogo from "../assets/sprin.png"; // Adjust the path as needed

const SprinLogo = ({ width, height, fontSize, fontFamily }) => {
  return (
    <div>
      <img src={sprinLogo} alt="Logo" className="w-[100px]" />
    </div>
  );
};

export default SprinLogo;
