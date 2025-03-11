import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { SiMinutemailer } from "react-icons/si";
import { BsArrowRight } from "react-icons/bs";

const ContactTile = ({ title, icon }) => {
  const handlePress = () => {
    switch (icon) {
      case "phone":
        window.open("tel:+2348135289984", "_blank");
        break;
      case "whatsapp":
        window.open("https://wa.me/+2348135289984", "_blank");
        break;
      case "message-alert":
        window.open("mailto:sprinapp@gmail.com", "_blank");
        break;
      default:
        break;
    }
  };

  const getIcon = () => {
    switch (icon) {
      case "phone":
        return <IoIosCall className="text-primary text-lg" />;
      case "whatsapp":
        return <FaWhatsapp className="text-primary text-lg" />;
      case "message-alert":
        return <SiMinutemailer className="text-primary text-lg" />;
      default:
        return <FaPhone className="text-primary text-lg" />;
    }
  };

  return (
    <div className="cursor-pointer" onClick={handlePress}>
      <div className="flex justify-between items-center py-3 ">
        <div className="flex items-center space-x-4">
          {getIcon()}
          <span className="text-gray-800 text-[12px] md:text-[14px] font-medium">
            {title}
          </span>
        </div>
        <BsArrowRight className="text-gray-400 text-[14px]" />
      </div>
      <hr className="border-gray-300 opacity-70 ml-[30px]" />
    </div>
  );
};

export default ContactTile;
