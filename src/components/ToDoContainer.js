import React from "react";
import ToDoItem from "./ToDoItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown,faClock } from "@fortawesome/free-solid-svg-icons";

function ToDoContainer({
  todos,
  onEditTodo,
  onDeleteTodo,
  onCompleteTodo,
  sortAscending,
  sortDescending,
  sortDeadline
}) {

  
  const ascendingSorting = () => {
    sortAscending();
    console.log("sorted asc");
  };
  const descendingSorting = () => {
    sortDescending();
    console.log("sorted desc");
  };
  const deadlineSorting = () => {
    sortDeadline();
  };

  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        // height:"100%",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          color:"black",
          fontWeight:"bold",
        }}
      >
        To-do Items
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <FontAwesomeIcon icon={faCaretUp} onClick={ascendingSorting} style={{color:"orange"}} />
          <FontAwesomeIcon icon={faCaretDown} onClick={descendingSorting} style={{color:"orange"}} />
        </div>
        <div> <FontAwesomeIcon icon={faClock} onClick={deadlineSorting}/></div>
      </div>
      <ul style={{display:"flex",flexDirection:"column",gap:"10px",width:"100%",}}>
        {todos.map((todo, index) => (
          <ToDoItem
            key={index}
            todo={todo}
            onEdit={onEditTodo}
            onDelete={onDeleteTodo}
            onComplete={onCompleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default ToDoContainer;
