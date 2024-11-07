import React from "react";
import feature1 from "../assets/feature1.png";
import feature2 from "../assets/feature2.png";
import feature3 from "../assets/feature3.png";
import feature4 from "../assets/feature4.png";

const Contact = () => {
  return (
    <div>
      <div className="bg-secondary w-[1100px] h-[550px] flex justify-center items-center">
        <img className="h-[460px]" src={feature1} />
        <img className="h-[460px]" src={feature2} />
        <img className="h-[460px]" src={feature3} />
        <img className="h-[460px]" src={feature4} />
      </div>
    </div>
  );
};

export default Contact;
