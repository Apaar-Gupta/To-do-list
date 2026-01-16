import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// attach token safely
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("todoapp"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const createTodo = (data) =>
  API.post("/api/v1/todo/create", data);

export const getAllTodo = (id) =>
  API.get(`/api/v1/todo/getAll/${id}`);

export const updateTodo = (id, data) =>
  API.patch(`/api/v1/todo/update/${id}`, data);

export const deleteTodo = (id) =>
  API.delete(`/api/v1/todo/delete/${id}`);

const TodoServices = {
  createTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
};

export default TodoServices;
