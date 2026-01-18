import React, { useEffect, useState } from "react";
import Navbar from './../../components/Layout/Navbar';
import PopModal from '../../components/popModal.js';
import TodoServices from "../../Services/TodoServices.js";
import Card from "../../components/Card/card.jsx";
import { useCallback } from "react";


const Home = () => {

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);
  const [deadline, setDeadline] = useState("");

  const openModalHandler = () => {
    setShowModal(true);
  };


  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData && userData?.user.id;
  console.log(id);


  const getUserTask = useCallback(async () => {
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setAllTask(data?.todos);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getUserTask();
  }, [getUserTask]);




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
        {allTask && <Card
          allTask={allTask}
          setAllTask={setAllTask}
          getUserTask={getUserTask}
        />
        }

        <PopModal
          getUserTask={getUserTask}
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          deadline={deadline}
          setDeadline={setDeadline}
        />
      </div>
    </>
  )
}

export default Home
