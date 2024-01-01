import React from "react";

function AddTodo({openInputForm}) {
  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    border: "none",
    borderRadius: "10px",
    width: "100%",
  };
  return <button style={buttonStyle} onClick={openInputForm}>+</button>;
}

export default AddTodo;
