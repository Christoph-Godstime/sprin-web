import React, { useState, useEffect, useRef } from "react";
// import UserCard from "../UserCard";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import MsgDisplay from "./MsgDisplay";
// import Icons from "../Icons";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { imageShow, videoShow } from "../../../utils/mediaShow";
import { sendImageUpload } from "../../../utils/imageUpload";
import {
  addMessage,
  getMessages,
  MESS_TYPES,
  deleteConversation,
} from "../../../redux/actions/messageAction";
import { MdOutlineAttachFile } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import wallpaper from "../../../assets/wallpaper.jpg";
import { FaPhone } from "react-icons/fa6";
import Logo from "../../../components/Logo";

const ChatEngine = ({ visible }) => {
  const { message, socket, peer, support } = useSelector((state) => state);
  const dispatch = useDispatch();

  const userData = support.support;

  const id = "66444b3bbb97c72bd2cd376a";
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = message.data.filter(
      (item) => item.sender === userData?._id || item.sender === id
    );
    setData(newData);
  }, [message.data, userData?._id, id]);

  useEffect(() => {
    const newUser = message.users.find((user) => user.id === id);
    if (newUser) {
      setUser(newUser);
    }
  }, [message.users, id]);

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.type > 1024 * 1024 * 5) {
        return (err = "File cannot be more than 5mb");
      }

      return newMedia.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText("");
    setMedia([]);
    setLoadMedia(true);

    let newArr = [];
    if (media.length > 0) newArr = await sendImageUpload(media);

    const msg = {
      sender: userData?._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };

    setLoadMedia(false);
    dispatch(addMessage({ msg, userData, socket }));
  };

  function ScrollToBottom() {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  }

  // call
  const caller = ({ video }) => {
    const msg = {
      sender: userData?._id,
      recipient: id,
      video,
    };
    dispatch({ type: GLOBALTYPES.CALL, payload: msg });
  };

  const callUser = ({ video }) => {
    const { _id } = userData;

    const msg = {
      sender: _id,
      recipient: id,
      video,
    };

    if (peer.open) msg.peerId = peer._id;

    socket.emit("callUser", msg);
  };

  const handleAudioCall = () => {
    caller({ video: false });
    callUser({ video: false });
  };

  return (
    <div className={visible ? "block h-full" : "hidden"}>
      <div className="flex flex-col  h-full">
        <div className="message_header px-[10px] bg-orange-100">
          {user.length !== 0 && (
            <div className="grid grid-cols-3 w-full items-center">
              <div></div>
              <div className="mx-auto">
                <Logo width="w-[13px]" text="text-[20px]" />
              </div>
              <span className="flex justify-end">
                <FaPhone
                  onClick={handleAudioCall}
                  className="cursor-pointer text-[25px]"
                />
              </span>
            </div>
          )}
        </div>

        <div
          className="chat_container relative sm:scrollbar sm:scrollbar-w-[6px] sm:scrollbar-thumb-primary sm:scrollbar-track-transparent sm:scrollbar-thumb-rounded-full sm:scrollbar-track-rounded-full"
          style={{
            backgroundImage: `url(${wallpaper})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backdropFilter: "",
          }}
        >
          <div className="chat_display ">
            {data.map((msg, index) => (
              <div key={index} className="z-40">
                {msg.sender !== userData?._id && (
                  <div className="chat_row other_message">
                    <MsgDisplay user={userData} msg={msg} />
                  </div>
                )}

                {msg.sender === userData?._id && (
                  <div className="chat_row you_message">
                    <MsgDisplay user={userData} msg={msg} data={data} />
                  </div>
                )}
              </div>
            ))}

            {loadMedia && (
              <div className="chat_row you_message">
                <div className="w-[40px]">
                  {/* <img src={LoadIcon} alt="loading" /> */}
                </div>
              </div>
            )}
          </div>
          <div
            className="show_media "
            style={{ display: media.length > 0 ? "grid" : "none" }}
          >
            {media.map((item, index) => (
              <div key={index} id="file_media">
                {item.type.match(/video/i)
                  ? videoShow(URL.createObjectURL(item))
                  : imageShow(URL.createObjectURL(item))}
                <span onClick={() => handleDeleteMedia(index)}>&times;</span>
              </div>
            ))}
          </div>
          <ScrollToBottom />
        </div>

        <form className="chat_input bg-white mt-auto " onSubmit={handleSubmit}>
          <input
            className="px-[10px] placeholder:text-gray-800 placeholder:text-[14px] text-[14px]"
            type="text"
            placeholder="Enter your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* <div className="z-40">
          <Icons setContent={setText} content={text} />
        </div> */}

          <div className="file_upload">
            <div className="material-icons text-[28px] text-gray-600 pr-[10px] mt-[6px]">
              <MdOutlineAttachFile />
            </div>
            <input
              type="file"
              name="file"
              id="file"
              multiple
              accept="image/*,video/*"
              onChange={handleChangeMedia}
            />
          </div>

          <button
            type="submit"
            className={text || media.length > 0 ? " mr-[10px] " : "hidden"}
          >
            <IoSend className="text-[22px] text-primary" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatEngine;
