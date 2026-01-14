import axios from 'axios';
const user=JSON.parse(localStorage.getItem('todoapp'));

axios.defaults.headers.common['Authorization']=`Bearer ${user.token}`;

const createTodo=async(data)=>{
    return await axios.post('/api/v1/todo/create',data);
}

const TodoServices={createTodo};

export default TodoServices;