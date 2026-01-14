
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing.js';
import About from './pages/About/About.js';
import Login from './pages/Auth/Login.js';
import Register from './pages/Auth/Register.js';
import TodoList from './pages/Todos/TodoList.js';
import {Toaster} from 'react-hot-toast';
import Home from './pages/Home/Home.js';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<TodoList />} />
      </Routes>
   <Toaster/>
    </div>
  );
}

export default App;
