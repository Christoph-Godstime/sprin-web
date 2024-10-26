import React, { useState } from "react";
import { styles } from "../styles";
import EmailForm from "./EmailForm";
import ChatEngine from "./ChatEngine";
import { useSelector, useDispatch } from "react-redux";

const SupportWindow = (props) => {
  const { support } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [chat, setChat] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [chatVisible, setChatVisible] = useState(false);
  // console.log(props);
  return (
    <div
      className="transition-5 z-40 h-[calc(100vh-200px)] fixed bottom-[116px] right-[3%] md:right-[24px] w-[420px] max-w-[calc(94%)] md:max-w-[calc(100%-48px)]"
      style={{
        ...styles.supportWindow,
        ...{
          opacity: props.visible ? "1" : "0",
          display: props.visible ? "block" : "none",
        },
      }}
    >
      <EmailForm
        visible={!chatVisible} // Show EmailForm if ChatEngine is not visible
        setVisible={setIsVisible} // Function to toggle EmailForm visibility
        setChatVisible={setChatVisible} // Function to toggle ChatEngine visibility
        setUser={setUser}
      />
      <ChatEngine visible={chatVisible} userData={support} />
    </div>
  );
};

export default SupportWindow;
