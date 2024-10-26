import React from "react";
// import Avatar from "../Avatar";
import { imageShow, videoShow } from "../../../utils/mediaShow";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessages } from "../../../redux/actions/messageAction";
import Times from "./Times";

const MsgDisplay = ({ user, msg, data }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="chat_title flex items-center"></div>
      <div className="you_content">
        <div>
          {msg.text && (
            <div className="chat_text text-[14px] font-normal">{msg.text}</div>
          )}
          {msg.media.map((item, index) => (
            <div className="w-[120px]" key={index}>
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

      <div className="text-black text-[12px] bg-background01">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default MsgDisplay;
