import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileContext } from "../context/UserProfileContext";
import { IoChevronBackCircle } from "react-icons/io5";

const ReusableHeader = ({ title, backbtn = true }) => {
  const navigate = useNavigate();
  const { profileDetails } = useContext(UserProfileContext);

  return (
    <div className="mb-2 mx-3 flex items-center justify-between">
      {backbtn && (
        <button onClick={() => navigate(-1)} className="text-primary">
          <IoChevronBackCircle size={30} />
        </button>
      )}

      <h2 className="text-[16px] font-medium text-black">{title}</h2>

      <img
        src={profileDetails?.profile}
        alt="Profile"
        className="w-[45px] h-[45px] rounded-full object-cover"
      />
    </div>
  );
};

export default ReusableHeader;
