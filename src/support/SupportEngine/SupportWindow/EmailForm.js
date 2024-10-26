import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { postDataApi, getDataApi } from "../../../utils/fetchData";
import {
  MESS_TYPES,
  getConversations,
  getMessages,
} from "../../../redux/actions/messageAction";
import { styles } from "../styles";
import { LoadingOutlined } from "@ant-design/icons";

import logo1 from "../../../assets/logo1.png";
import { RiArrowRightLine } from "react-icons/ri";

const EmailForm = (props) => {
  const { message, support } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { visible, setVisible, setChatVisible } = props;
  const initialState = { email: "" };
  const [userData, setUserData] = useState(initialState);
  const { email } = userData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [page, setPage] = useState(0);

  const id = "66444b3bbb97c72bd2cd376a";

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await postDataApi("account", userData);

      dispatch({
        type: GLOBALTYPES.SUPPORT,
        payload: { support: res.data.account },
      });

      dispatch({
        type: MESS_TYPES.ADD_USER,
        payload: { ...{ id }, text: "", media: [] },
      });

      const messageData = await getDataApi(
        `message/${id}/${res.data.account._id}?limit=${page * 20}`
      );

      dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: messageData.data });

      // await dispatch(getMessages(id, res.data.account._id));
      // dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: { messages: [] } });
      // console.log(id, res.data.account._id);

      setLoading(false);
      if (res.data.status) {
        setVisible(false); // Hide EmailForm
        setChatVisible(true); // Show ChatEngine
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error?.response?.data?.message },
      });
    }
  };

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 20 && page > 1) {
      dispatch(getConversations({ user, page }));
    }
  }, [message.resultUsers, page, id, dispatch]);

  return (
    <div
      className={props.visible ? "block" : "hidden"}
      style={{
        ...styles.emailFormWindow,
        ...{
          height: props.visible ? "100%" : "0",
          opacity: props.visible ? "1" : "0",
        },
      }}
    >
      <div style={{ height: "0px" }}>
        <div
          className="bg-gradient-to-b  from-indigo-950 "
          style={styles.stripe}
        ></div>
      </div>

      <div
        className="transition-5"
        style={{
          ...styles.loadingDiv,
          ...{
            zIndex: loading ? "10" : "-1",
            background: loading ? "#0006" : "",
          },
        }}
      />

      <LoadingOutlined
        className="transition-5"
        style={{
          ...styles.loadingIcon,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "1" : "0",
            fontSize: "60px",
            top: "calc(50% - 30px)",
            left: "calc(50% - 30px)",
          },
        }}
      />

      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div className="relative left-[30px] top-[30px]">
          <img className="w-[15px]" src={logo1} />
        </div>

        <div className="leading-[30px] text-orange-100" style={styles.topText}>
          Hi there <br /> How can I help?
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative w-[100%] top-[19.75%]"
        >
          <div className="relative">
            <input
              className="px-[60px] py-[10px]"
              style={styles.emailInput}
              name="email"
              onChange={handleChangeInput}
              placeholder="Your email"
              type="email"
              value={email}
              required
            />
            <button
              type="submit"
              className="flex justify-center items-center absolute bg-primary hover:bg-orange-600 w-[35px] h-[35px] rounded-full right-[30px] top-1/2 transform -translate-y-1/2"
            >
              <RiArrowRightLine className="text-white text-[20px]" />
            </button>
          </div>

          <div className="leading-[30px]" style={styles.bottomText}>
            Enter you email <br /> to get started
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
