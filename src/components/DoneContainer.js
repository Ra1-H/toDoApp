import React from "react";
import Doneitem from "./Done";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function DoneContainer({ todos, sortAscending, sortDescending, onDeleteTodo }) {
  const ascendingSorting = () => {
    sortAscending();
    console.log("sorted asc");
  };
  const descendingSorting = () => {
    sortDescending();
    console.log("sorted desc");
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
          color: "black",
          fontWeight: "bold",
        }}
      >
        Done Todos
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <FontAwesomeIcon
            icon={faCaretUp}
            onClick={ascendingSorting}
            style={{ color: "orange" }}
          />
          <FontAwesomeIcon
            icon={faCaretDown}
            onClick={descendingSorting}
            style={{ color: "orange" }}
          />
        </div>
      </div>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        {todos.map((todo, index) => (
          <Doneitem key={index} todo={todo} onDelete={onDeleteTodo} />
        ))}
      </ul>
    </div>
  );
}

export default DoneContainer;
