import React, { useState, useRef, useEffect } from "react";
import SupportButton from "./SupportButton";
import SupportWindow from "./SupportWindow";

const SupportEngine = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleClickOutSide(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [ref]);

  const buttonClick = () => {
    if (visible === false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  return (
    <div ref={ref}>
      <SupportWindow visible={visible} />

      <SupportButton
        onClick={() => buttonClick()}
        style={{ position: "fixed", bottom: "24px", right: "24px" }}
      />
    </div>
  );
};

export default SupportEngine;
