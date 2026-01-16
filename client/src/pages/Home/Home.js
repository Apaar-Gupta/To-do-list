import React, { useEffect, useState } from "react";
import Navbar from './../../components/Layout/Navbar';
import PopModal from '../../components/popModal.js';
import TodoServices from "../../Services/TodoServices.js";
import Card from "../../components/Card/card.jsx";

const Home = () => {

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);
  
  const openModalHandler = () => {
    setShowModal(true);
  };


  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData && userData?.user.id;
  console.log(id);
  const getUserTask = async () => {
    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setLoading(false);
       console.log(data);
      setAllTask(data?.todos);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserTask();
  }, []);

    const handleSearch = (e) => {
    const query = e.target.value;
    let filterList = allTask?.filter((item) =>
      item.title.toLowerCase().match(query.toLowerCase())
    );
    console.log("Filterd list===>", filterList);
    setSearchQuery(query);
    if (query && filterList.length > 0) {
      setAllTask(filterList && filterList);
    } else {
      getUserTask();
    }
  };


  return (  
    <>
    <Navbar />
       <div className="container">
        <div className="add-task">
          <h1>Your Task</h1>
          <input
            type="search"
            placeholder="search your task"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className=" btn btn-primary" onClick={openModalHandler}>
            Create Task <i className="fa-solid fa-plus"></i>
          </button>
        </div>
{allTask && <Card allTask={allTask} />}
      
        <PopModal
          getUserTask={getUserTask}
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
      </div>
    </>
  )
}

export default Home
