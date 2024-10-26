import React, { useState, useEffect, useRef } from "react";
import UserCard from "../UserCard";
import { useSelector, useDispatch } from "react-redux";
import { getDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { useHistory, useParams } from "react-router-dom";
import {
  MESS_TYPES,
  getConversations,
} from "../../redux/actions/messageAction";

const LeftSide = () => {
  const { auth, message, online } = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useHistory();
  const { id } = useParams();

  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };

  const handleAddUser = (user) => {
    dispatch({
      type: MESS_TYPES.ADD_USER,
      payload: { ...user, text: "", media: [] },
    });
    return history.push(`/login/message/${user._id}`);
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

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
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, id, auth, dispatch]);

  // check user online - offline
  useEffect(() => {
    if (message.firstload) {
      dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    }
  }, [online, message.firstload, dispatch]);

  const newOnline = online.filter((val, id, array) => array.indexOf(val) == id);

  return (
    <>
      <div className="message_chat_list">
        <>
          {searchUsers.map((user) => (
            <div
              key={user._id}
              className={
                user.category === "client" || auth.user._id === user._id
                  ? "hidden"
                  : `message_user ${isActive(user)}`
              }
              onClick={() => handleAddUser(user)}
            >
              <UserCard user={user} />
            </div>
          ))}
        </>

        <button ref={pageEnd} style={{ opacity: 0 }}>
          Load more
        </button>
      </div>
    </>
  );
};

export default LeftSide;
