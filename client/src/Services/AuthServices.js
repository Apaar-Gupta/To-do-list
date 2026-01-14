import axios from "axios";

axios.defaults.baseURL = "https://to-do-list-xc5k.onrender.com";
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
