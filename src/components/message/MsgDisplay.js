import React from "react";
import Avatar from "../Avatar";
import { imageShow, videoShow } from "../../utils/mediaShow";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessages } from "../../redux/actions/messageAction";
import Times from "./Times";

const MsgDisplay = ({ user, msg, data }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteMessages = () => {
    if (!data) return;
    if (window.confirm("Do you want to delete?")) {
      dispatch(deleteMessages({ msg, data, auth }));
    }
  };

  return (
    <>
      <div className="chat_title flex items-center">
        <div className="w-[20px] mr-[2px]">
          <Avatar src={user.avatar} />
        </div>
        <span className="text-[15px]">{user.username}</span>
      </div>
      <div className="you_content">
        {user._id === auth.user._id && (
          <div
            className="fa_trash material-icons  text-danger"
            onClick={handleDeleteMessages}
          >
            delete
          </div>
        )}
        <div>
          {msg.text && (
            <div className="chat_text text-[14px] font-normal">{msg.text}</div>
          )}
          {msg.media.map((item, index) => (
            <div key={index}>
              {item.url.match(/video/i)
                ? videoShow(item.url)
                : imageShow(item.url)}
            </div>
          ))}
        </div>

        {msg.call && (
          <button
            className="btn-flex align-items-center p-3 flex"
            style={{ background: "#eee", borderRadius: "10px" }}
          >
            <span
              className="material-icons font-weight-bold mr-1"
              style={{
                fontSize: "2.5rem",
                color: msg.call.times === 0 ? "crimson" : "green",
              }}
            >
              {msg.call.times === 0
                ? msg.call.video
                  ? "videocam_off"
                  : "phone_disabled"
                : msg.call.video
                ? "video_camera_front"
                : "call"}
            </span>

            <div className="text-left">
              <h6 className="text-[13px] font-semibold">
                {msg.call.video ? "Video Call" : "Audio Call"}
              </h6>
              <small>
                {msg.call.times > 0 ? (
                  <Times total={msg.call.times} />
                ) : (
                  new Date(msg.createdAt).toLocaleTimeString()
                )}
              </small>
            </div>
          </button>
        )}
      </div>

      <div className="chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default MsgDisplay;
