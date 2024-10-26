import React, { useState, useEffect, useRef } from "react";
import UserCard from "../UserCard";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import MsgDisplay from "./MsgDisplay";
import Icons from "../Icons";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { imageShow, videoShow } from "../../utils/mediaShow";
import { sendImageUpload } from "../../utils/imageUpload";
import {
  addMessage,
  getMessages,
  MESS_TYPES,
  deleteConversation,
} from "../../redux/actions/messageAction";
import LoadIcon from "../../assets/loading.gif";

const RightSide = () => {
  const { auth, message, socket, peer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const refDisplay = useRef();
  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const [data, setData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const newData = message.data.filter(
      (item) => item.sender === auth.user._id || item.sender === id
    );
    setData(newData);
    setPage(1);
  }, [message.data, auth.user._id, id]);

  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id);
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
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };

    setLoadMedia(false);
    dispatch(addMessage({ msg, auth, socket }));

    // if(refDisplay.current){
    //   refDisplay.current.scrollIntoView({behavior: "smooth", block: "end"})
    // }
  };

  function ScrollToBottom() {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  }

  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: { messages: [] } });

        await dispatch(getMessages({ auth, id }));
      };
      getMessagesData();
    }
  }, [id, dispatch, auth]);

  // load more
  useEffect(() => {
    const observe = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observe.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultData >= (page - 1) * 9 && page > 1) {
      dispatch(getMessages({ auth, id, page }));
    }
  }, [message.resultData, page, id, auth, dispatch]);

  useEffect(() => {
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [text]);

  const handleDeleteConversation = () => {
    if (window.confirm("Do you want to delete?")) {
      dispatch(deleteConversation({ auth, id }));
      return history.push("/login/message");
    }
  };

  // call
  const caller = ({ video }) => {
    const { _id, avatar, username, fullname, job } = user;
    const msg = {
      sender: auth.user._id,
      recipient: _id,
      avatar,
      username,
      fullname,
      job,
      video,
    };
    dispatch({ type: GLOBALTYPES.CALL, payload: msg });
  };

  const callUser = ({ video }) => {
    const { _id, avatar, username, fullname, job } = auth.user;

    const msg = {
      sender: _id,
      recipient: user._id,
      avatar,
      username,
      fullname,
      job,
      video,
    };

    if (peer.open) msg.peerId = peer._id;

    socket.emit("callUser", msg);
  };

  const handleAudioCall = () => {
    caller({ video: false });
    callUser({ video: false });
  };

  const handleVideoCall = () => {
    caller({ video: true });
    callUser({ video: true });
  };

  return (
    <>
      <div className="message_header px-[10px]" style={{ cursor: "pointer" }}>
        {user.length !== 0 && (
          <UserCard user={user}>
            <div>
              <span className="material-icons " onClick={handleAudioCall}>
                phone
              </span>

              <span className="material-icons mx-3 " onClick={handleVideoCall}>
                videocam
              </span>

              <span
                className="material-icons text-danger"
                onClick={handleDeleteConversation}
              >
                delete
              </span>
            </div>
          </UserCard>
        )}
      </div>

      <div className="chat_container relative">
        <div className="relative ">
          <h4
            className="travail fixed text-[50px] top-1/2 left-1/2  
          italic font-semibold"
            style={{ opacity: 0.1 }}
          >
            Travail
          </h4>
        </div>

        <div className="chat_display ">
          <button style={{ marginTop: "-25px", opacity: 0 }} ref={pageEnd}>
            Load more
          </button>
          {data.map((msg, index) => (
            <div key={index} className="z-40">
              {msg.sender !== auth.user._id && (
                <div className="chat_row other_message">
                  <MsgDisplay user={user} msg={msg} />
                </div>
              )}

              {msg.sender === auth.user._id && (
                <div className="chat_row you_message">
                  <MsgDisplay user={auth.user} msg={msg} data={data} />
                </div>
              )}
            </div>
          ))}

          {loadMedia && (
            <div className="chat_row you_message">
              <div className="w-[40px]">
                <img src={LoadIcon} alt="loading" />
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

      <form className="chat_input bg-white pb-[60px]" onSubmit={handleSubmit}>
        <input
          className="px-[10px]"
          type="text"
          placeholder="Enter your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="z-40">
          <Icons setContent={setText} content={text} />
        </div>

        <div className="file_upload">
          <div className="material-icons text-[28px] text-gray-600 pr-[10px] mt-[6px]">
            attachment
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
          className={
            text || media.length > 0 ? "material-icons mr-[10px] " : "hidden"
          }
        >
          send
        </button>
      </form>
    </>
  );
};

export default RightSide;
