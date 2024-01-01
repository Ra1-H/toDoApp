import React from "react";
import InputForm from "./components/InputForm";
import AddTodo from "./components/AddTodo";
import SearchTodo from "./components/SearchTodo";
import { useState, useEffect } from "react";
import ToDoContainer from "./components/ToDoContainer";
import DoneContainer from "./components/DoneContainer";

function App() {
  const tasXStyles = {
    width: "100%",
    backgroundColor: "black",
    borderRadius: "10px",
    height: "auto",
    color: "orange",
    fontSize: "30px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const appStyles = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#242424",
    padding: "10px",
    color: "white",
  };

  const [todos, setTodos] = useState([]);
  const[done,setDone]=useState([]);
  // const[moved,setMoved]=useState({})

  const [textInput, setTextInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [priorityInput, setPriorityInput] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  const [isInputFormOpen, setIsInputFormOpen] = useState(false);

  function onTextInputChange(event) {
    setTextInput(event.target.value);
  }

  function onTitleInputChange(event) {
    setTitleInput(event.target.value);
  }

  function onPriorityInputChange(event) {
    setPriorityInput(Number(event.target.value));
  }
  function onDateInputChange(event) {
    const dateValue = event.target.value;
    setSelectedDate(dateValue);

    // Calculate time remaining in days
    const currentDate = new Date();
    const selectedDateTime = new Date(dateValue);
    const timeRemaining = selectedDateTime - currentDate;

    // Convert milliseconds to days
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    setDeadline(`${days} days`);
  }

  function handleDelete(todoId) {
    let updatedTodos = todos.filter((todo) => todo.id !== todoId);
    let updatedDone=done.filter((doneTodo) => doneTodo.id !== todoId);
    setTodos(updatedTodos);
    setDone(updatedDone);
  }

  function handleEdit(todoId) {
    console.log("edit clicked");
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    console.log(todoToEdit);
    setEditTodo(todoToEdit);
  }

  useEffect(() => {
    if (editTodo) {
      console.log("editing a todo now");
      setTitleInput(editTodo.title);
      setTextInput(editTodo.content);
      setPriorityInput(editTodo.priority);
      setSelectedDate(editTodo.selectedDate);
    }
  }, [editTodo]);

  function handleAddNote(event) {
    if (!titleInput || !priorityInput || !selectedDate) {
      alert("Please fill in the required fields");
      return;
    }

    if (editTodo) {
      // If editNote is not null, it means we are in edit mode
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTodo.id) {
          return {
            ...todo,
            title: titleInput,
            content: textInput,
            priority: priorityInput,
            selectedDate: selectedDate,
            deadline: deadline,
            completed: todo.completed,
          };
        }
        return todo;
      });

      setTodos(updatedTodos);
      setEditTodo(null);
      setTextInput("");
      setTitleInput("");
      setPriorityInput("");
      setSelectedDate("");
    } else {
      const newTodo = {
        id:new Date().getTime(),
        title: titleInput,
        content: textInput,
        priority: priorityInput,
        selectedDate: selectedDate,
        deadline: deadline,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setTextInput("");
      setTitleInput("");
      setPriorityInput("");
      setSelectedDate("");

      console.log(
        titleInput,
        textInput,
        priorityInput,
        selectedDate,
        deadline,
        newTodo.id
      );
    }
  }

  function handleComplete(todoId) {
    const completedTodo = todos.find((todo) => todo.id === todoId);
    completedTodo.completed = !completedTodo.completed;
    console.log(completedTodo)
    let updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos)
    // setMoved(completedTodo,completed:true)
    setDone([...done,completedTodo])
  }

  function sortAscending() {
    let sortedArray = [...todos].sort(function (a, b) {
      return a.priority - b.priority;
    });
    console.log(sortedArray);
    setTodos(sortedArray);
  }

  function sortDescending() {
    let sortedArray = [...todos].sort(function (a, b) {
      return b.priority - a.priority;
    });
    console.log(sortedArray);
    setTodos(sortedArray);
  }

  function openInputForm() {
    setIsInputFormOpen(true);
  }

  function closeInputForm() {
    setIsInputFormOpen(false);
  }


  
  return (
    <div style={appStyles}>
      <div style={tasXStyles}>tasX</div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <div style={{ width: "15%" }}>
          <AddTodo openInputForm={openInputForm} />
        </div>

        <div style={{ width: "85%" }}>
          <SearchTodo />
        </div>

        {isInputFormOpen && (
          <InputForm
            textInput={textInput}
            setTextInput={setTextInput}
            onTextChange={onTextInputChange}
            titleInput={titleInput}
            onTitleChange={onTitleInputChange}
            priorityInput={priorityInput}
            onPriorityChange={onPriorityInputChange}
            selectedDate={selectedDate}
            onDateChange={onDateInputChange}
            addNote={handleAddNote}
            closeInputForm={closeInputForm}
          />
        )}
      </div>
      <div
        style={{ border: "1px solid black", display: "block", width: "100%" }}
      ></div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "50%", height: "auto", padding: "10px" }}>
          <ToDoContainer
            todos={todos}
            onEditTodo={handleEdit}
            onDeleteTodo={handleDelete}
            onCompleteTodo={handleComplete}
            sortAscending={sortAscending}
            sortDescending={sortDescending}
          />
        </div>
        <div style={{ width: "50%", padding: "10px" }}>
          <DoneContainer
            todos={done}
            sortAscending={sortAscending}
            sortDescending={sortDescending}
            onDeleteTodo={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
