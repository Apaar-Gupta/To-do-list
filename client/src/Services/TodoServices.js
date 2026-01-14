import axios from "axios";


axios.defaults.baseURL = "https://to-do-list-xc5k.onrender.com";

const user = JSON.parse(localStorage.getItem("todoapp"));

if (user?.token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
}



const createTodo = async (data) => {
  return axios.post("/api/v1/todo/create", data);
};

const getAllTodo = async (id) => {
  return axios.get(`/api/v1/todo/getAll/${id}`);
};

const updateTodo = async (id, data) => {
  return axios.patch(`/api/v1/todo/update/${id}`, data);
};

const deleteTodo = async (id) => {
  return axios.delete(`/api/v1/todo/delete/${id}`);
};

const TodoServices = {
  createTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
};

export default TodoServices;
