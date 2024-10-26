import axios from "axios";

const BaseUrl = "http://localhost:5000";

export const getDataApi = async (url) => {
  const res = await axios.get(`${BaseUrl}/api/message/${url}`);
  return res;
};

export const postDataApi = async (url, post) => {
  const res = await axios.post(`${BaseUrl}/api/message/${url}`, post);
  return res;
};

export const putDataApi = async (url, post) => {
  const res = await axios.put(`${BaseUrl}/api/message/${url}`, post);
  return res;
};

export const patchDataApi = async (url, post) => {
  const res = await axios.patch(`${BaseUrl}/api/message/${url}`, post);
  return res;
};

export const deleteDataApi = async (url) => {
  const res = await axios.delete(`${BaseUrl}/api/message/${url}`);
  return res;
};
