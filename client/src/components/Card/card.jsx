import React, { useState } from "react";
import EditTodo from "../EditTodo";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";

const Card = ({ allTask = [], getUserTask }) => {
  const [editTask, setEditTask] = useState(null);

  // Edit handler
  const handleEdit = (task) => {
    setEditTask(task);
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("Task deleted successfully");
      getUserTask(); // refresh list
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  return (
    <>
      <div className="card-container">
        {allTask.length === 0 && (
          <p className="text-center mt-4">No tasks found</p>
        )}

        {allTask.map((task) => (
          <React.Fragment key={task._id}>
            <div
              className="card border-primary mb-3 mt-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header">
                <div className="chead">
                  <h6>{task?.title?.substring(0, 10) || "Untitled"}</h6>
                  <h6
                    className={task?.isCompleted ? "task-cmp" : "task-inc"}
                  >
                    {task?.isCompleted ? "Completed" : "Incomplete"}
                  </h6>
                </div>
              </div>

              <div className="card-body">
                <h6 style={{ fontWeight: "bold" }}>
                  {task?.title || "No title"}
                </h6>
                <p className="card-text">
                  {task?.description || "No description"}
                </p>
                <h6>
                  Date :{" "}
                  {task?.createdAt
                    ? task.createdAt.substring(0, 10)
                    : "N/A"}
                </h6>
              </div>

              <div className="card-footer bg-transparent border-primary">
                <button
                  className="btn btn-warning"
                  title="Edit Task"
                  onClick={() => handleEdit(task)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>

                <button
                  className="btn btn-danger ms-2"
                  title="Delete Task"
                  onClick={() => handleDelete(task._id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Edit Modal */}
      {editTask && (
        <EditTodo
          task={editTask}
          setShowModal={() => setEditTask(null)}
          getUserTask={getUserTask}
        />
      )}
    </>
  );
};

export default Card;
