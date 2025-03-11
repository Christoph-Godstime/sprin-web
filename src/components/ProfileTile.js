import React from "react";
import {
  FaUserCircle,
  FaHistory,
  FaLock,
  FaQuestionCircle,
  FaLightbulb,
  FaGift,
  FaTrash,
} from "react-icons/fa";
import {
  AiOutlineSetting,
  AiOutlineCustomerService,
  AiOutlineWallet,
} from "react-icons/ai";
import { MdPrivacyTip, MdLocationOn } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa6";

const iconMap = {
  person: <FaUserCircle size={20} className="text-gray-500" />,
  setting: <AiOutlineSetting size={20} className="text-gray-500" />,
  location: <MdLocationOn size={20} className="text-gray-500" />,
  privacy: <MdPrivacyTip size={20} className="text-gray-500" />,
  bulb: <FaLightbulb size={20} className="text-gray-500" />,
  questioncircle: <FaQuestionCircle size={20} className="text-gray-500" />,
  customerservice: (
    <AiOutlineCustomerService size={20} className="text-gray-500" />
  ),
  gift: <FaGift size={20} className="text-gray-500" />,
  wallet: <AiOutlineWallet size={20} className="text-gray-500" />,
  delete: <FaTrash size={20} className="text-red-500" />,
};

const ProfileTile = ({ onPress, title, icon }) => {
  return (
    <div onClick={onPress} className="cursor-pointer">
      <div className="flex justify-between items-center py-2">
        <div className="flex items-center space-x-3">
          {iconMap[icon] || (
            <FaUserCircle size={20} className="text-gray-500" />
          )}
          <span className=" text-[10px] md:text-[12px] text-gray-500 font-regular">
            {title}
          </span>
        </div>
        <FaAngleRight size={18} className="text-gray-400 " />
      </div>
      <div className="border-t border-gray-300 opacity-70 w-full my-3" />
    </div>
  );
};

export default ProfileTile;
