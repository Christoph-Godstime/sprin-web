import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import { MESS_TYPES } from "./redux/actions/messageAction";
import audiobell from "./audio/client_src_audio_got-it-done-613.mp3";

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  };

  let n = new Notification(title, options);

  n.onclick = (e) => {
    e.preventDefault();
    window.open(`login${url}`, "_blank");
  };
};

const SocketClient = () => {
  const { support, socket, online, call } = useSelector((state) => state);
  const dispatch = useDispatch();

  const audioRef = useRef();

  // connect user
  useEffect(() => {
    socket.emit("joinUser", support?.support?._id);
  }, [socket, support?.support?._id]);

  // Message
  useEffect(() => {
    socket.on("addMessageToClient", (msg) => {
      dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg });

      dispatch({
        type: MESS_TYPES.ADD_USER,
        payload: { ...msg.user, text: msg.text, media: msg.media },
      });
    });

    return () => socket.off("addMessageToClient");
  }, [socket, dispatch]);

  // check user online / offlin
  useEffect(() => {
    socket.emit("checkUserOnline", support?.support);
  }, [socket, support?.support]);

  useEffect(() => {
    socket.on("checkUserOnlineToMe", (data) => {
      data.forEach((item) => {
        if (!online.includes(item.id)) {
          dispatch({ type: GLOBALTYPES.ONLINE, payload: item.id });
        }
      });
    });

    return () => socket.off("checkUserOnlineToMe");
  }, [socket, dispatch, online]);

  useEffect(() => {
    socket.on("checkUserOnlineToClient", (id) => {
      if (!online.includes(id)) {
        dispatch({ type: GLOBALTYPES.ONLINE, payload: id });
      }
    });

    return () => socket.off("checkUserOnlineToClient");
  }, [socket, dispatch, online]);

  // check user offline
  useEffect(() => {
    socket.on("checkUserOffline", (id) => {
      dispatch({ type: GLOBALTYPES.OFFLINE, payload: id });
    });

    return () => socket.off("checkUserOffline");
  }, [socket, dispatch]);

  // call user
  useEffect(() => {
    socket.on("callUserToClient", (data) => {
      dispatch({ type: GLOBALTYPES.CALL, payload: data });
    });

    return () => socket.off("callUserToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("userBusy", (data) => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: `${call.username} is busy!` },
      });
    });

    return () => socket.off("userBusy");
  }, [socket, dispatch, call]);
  return (
    <>
      <audio
        className="mt-[50px]"
        controls
        ref={audioRef}
        style={{ display: "none" }}
      >
        <source src={audiobell} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;
