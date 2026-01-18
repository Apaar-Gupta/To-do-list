import React, { useState } from "react";
import EditTodo from "../EditTodo";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";

const Card = ({ allTask = [], setAllTask, getUserTask }) => {
  const [editTask, setEditTask] = useState(null);

  // Edit handler
  const handleEdit = (task) => {
    setEditTask(task);
  };

  // ✅ Optimistic Delete handler
  const handleDelete = async (id) => {
    // 1️⃣ Update UI immediately
    setAllTask((prev) => prev.filter((task) => task._id !== id));

    try {
      const { data } = await TodoServices.deleteTodo(id);

      if (data?.success) {
        toast.success("Task deleted successfully");
      } else {
        toast.error("Failed to delete task");
        getUserTask(); // rollback
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
      getUserTask(); // rollback
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
              className="card border-primary mb-44 mt-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header">
                <div className="chead">
                  <h5>{task?.title?.substring(0, 10) || "Untitled"}</h5>
                  <h6 className={task?.isCompleted ? "task-cmp" : "task-inc"}>
                    {task?.isCompleted ? "Completed" : "Incomplete"}
                  </h6>
                </div>
              </div>

              <div className="card-body">

                <p className="card-text">
                  {task?.description || "No description"}
                </p>
                <div className="date-deadline">
                  <h6>
                    Task Created On:{" "}
                    {task?.createdAt
                      ? task.createdAt.substring(0, 10)
                      : "N/A"}
                  </h6>
                  <h6>
                    Deadline:{" "}
                    {task?.deadline
                      ? new Date(task.deadline).toISOString().split("T")[0]
                      : "No deadline"}
                  </h6>

                </div>
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
