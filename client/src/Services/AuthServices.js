import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const registerUser = (data) =>
  API.post("/api/v1/user/register", data);

export const loginUser = (data) =>
  API.post("/api/v1/user/login", data);

export default { registerUser, loginUser };
