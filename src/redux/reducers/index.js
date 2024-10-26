import { combineReducers } from "redux";
import support from "./supportReducer";

import socket from "./socketReducer";

import message from "./messageReducer";
import online from "./onlineReducer";
import call from "./callReducer";
import peer from "./peerReducer";

export default combineReducers({
  support,
  socket,
  message,
  online,
  call,
  peer,
});
