import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Doneitem({ todo, onEdit, onDelete }) {
  const todoStyles = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: "5px",
    backgroundColor: "black",
    borderRadius: "10px",
    color: "white",
  };

  const handleEditClick = () => {
    onEdit(todo.id);
    console.log("clicked edit from todoitem");
  };

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  const isDeadlineUrgent = parseInt(todo.deadline) < 4;

  return (
    <li className="todo" style={todoStyles}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "95%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            ({todo.priority}) {todo.title}
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <div style={{ color: isDeadlineUrgent ? "red" : "orange" }}>
              {todo.deadline}
            </div>
            <div>
              <div style={{ marginTop: "2px" }}>
                <input type="checkbox" checked="true" />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.content}
          </p>
          <div
            style={{
              display: "flex",
              color: "orange",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <p>
              <FontAwesomeIcon icon={faTrash} onClick={handleDeleteClick} />
            </p>
            <p>
              <FontAwesomeIcon icon={faPenToSquare} onClick={handleEditClick} />
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Doneitem;
