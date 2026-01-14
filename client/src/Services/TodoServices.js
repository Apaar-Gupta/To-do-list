import axios from 'axios';
const user=JSON.parse(localStorage.getItem('todoapp'));

axios.defaults.headers.common['Authorization']=`Bearer ${user.token}`;

const createTodo=async(data)=>{
    return await axios.post('/api/v1/todo/create',data);
}
const getAllTodo=async(id)=>{
    return await axios.post(`/api/v1/todo/getAll/${id}`);
}

const updateTodo = (id, data) => {
  return axios.patch("/api/v1/todo/update/" + id, data);
};

//DLEETE TODO
const deleteTodo = (id) => {
  return axios.delete("/api/v1/todo/delete/" + id);
};

const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };

export default TodoServices;