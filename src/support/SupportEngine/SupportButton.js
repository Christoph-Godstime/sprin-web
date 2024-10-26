import React, { useState } from "react";
import { RiMessage2Fill } from "react-icons/ri";
import { styles } from "./styles";

const SupportButton = (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="z-40" style={props.style}>
      <div
        style={{ ...styles.avatarHello, ...{ opacity: hovered ? "1" : "0" } }}
      >
        Hey, It's Wendy!!!
      </div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => props.onClick && props.onClick()}
        style={{
          ...styles.chatWithMeButton,
          ...{ border: hovered ? "1px solid #f9f0ff" : "3px solid #ffedd5" },
        }}
        className="transition-3 w-[60px] h-[60px] flex justify-center items-center rounded-full bg-secondary"
      >
        <RiMessage2Fill className="text-white text-[35px]" />
      </div>
    </div>
  );
};

export default SupportButton;
