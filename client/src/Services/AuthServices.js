import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
const registerUser = (data) => {
  return axios.post("/api/v1/user/register", data);
};

const loginUser = (data) => {
  return axios.post("/api/v1/user/login", data);
};

const AuthServices = {
  registerUser,
  loginUser,
};

export default AuthServices;
