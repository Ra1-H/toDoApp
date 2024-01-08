import React from "react";
import InputForm from "./components/InputForm";
import AddTodo from "./components/AddTodo";
import SearchTodo from "./components/SearchTodo";
import { useState, useEffect } from "react";
import ToDoContainer from "./components/ToDoContainer";
import DoneContainer from "./components/DoneContainer";
// import axios from "axios";

function App() {
  const tasXStyles = {
    // width: "100%",
    backgroundColor: "black",
    borderRadius: "10px",
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
    width: "100vw",
    backgroundColor: "#242424",
    padding: "10px",
    color: "white",
    height: "100%",
  };

  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState([]);
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
    let updatedDone = done.filter((doneTodo) => doneTodo.id !== todoId);
    setTodos(updatedTodos);
    setDone(updatedDone);
  }

  // const handleDelete = async (todoId) => {
  //   try {
  //     await axios.delete(`${API_BASE_URL}/${todoId}`);
  //     setTodos(todos.filter((todo) => todo.id !== todoId));
  //   } catch (error) {
  //     console.error("Error deleting todo:", error);
  //   }
  // };

  function handleEdit(todoId) {
    console.log("edit clicked");
    openInputForm();
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

  // //seerver
  // const API_BASE_URL = "http://localhost:3001/notes";
  // // Function to fetch todos from the server

  // // Function to handle adding/editing todos
  // const handleAddNote = async () => {
  //   try {
  //     if (!titleInput || !priorityInput || !selectedDate) {
  //       alert("Please fill in the required fields");
  //       return;
  //     }

  //     const newTodo = {
  //       title: titleInput,
  //       content: textInput,
  //       priority: priorityInput,
  //       selectedDate: selectedDate,
  //       deadline: deadline,
  //       completed: false,
  //     };

  //     if (editTodo) {
  //       // If editTodo is not null, it means we are in edit mode
  //       await axios.put(`${API_BASE_URL}/${editTodo.id}`, {
  //         ...editTodo,
  //         title: titleInput,
  //         content: textInput,
  //         priority: priorityInput,
  //         selectedDate: selectedDate,
  //         deadline: deadline,
  //       });
  //       setEditTodo(null);
  //     } else {
  //       // If editTodo is null, it means we are adding a new todo
  //       await axios.post(API_BASE_URL, newTodo);
  //       setTodos([...todos, newTodo]);
  //     }

  //     // Reset form inputs and state
  //     setTextInput("");
  //     setTitleInput("");
  //     setPriorityInput("");
  //     setSelectedDate("");
  //   } catch (error) {
  //     console.error("Error adding/editing todo:", error);
  //   }
  // };

  // const fetchTodos = async () => {
  //   try {
  //     const response = await axios.get(API_BASE_URL);
  //     setTodos(response.data);
  //   } catch (error) {
  //     console.error("Error fetching todos:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchTodos();
  // }, []);

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
        id: new Date().getTime(),
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
    console.log(completedTodo);
    let updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
    // setMoved(completedTodo,completed:true)
    if (completedTodo.completed) {
      // If completed, move to Done container
      setDone([...done, completedTodo]);
    } else {
      // If not completed, remove from Done container
      const updatedDone = done.filter((doneTodo) => doneTodo.id !== todoId);
      setDone(updatedDone);
    }
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

  const deadlineOrdering = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      // Assuming the deadlines are in the format "X days"
      const deadlineA = parseInt(a.deadline);
      const deadlineB = parseInt(b.deadline);

      return deadlineA - deadlineB;
    });

    setTodos(sortedTodos);
  };

  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filteredDone, setFilteredDone] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = (searchQuery) => {
    setSearchInput(searchQuery);
    console.log(searchInput);
    const filteredTodos = todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter done based on title and content
    const filteredDone = done.filter(
      (doneTodo) =>
        doneTodo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doneTodo.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredTodos(filteredTodos);
    setFilteredDone(filteredDone);
  };

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
          <SearchTodo onSearch={handleSearch} />
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
          // overflowY:"scroll"
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "50%",
            padding: "10px",
            height: "100%",
            overflowY: "scroll",
          }}
        >
          <ToDoContainer
            todos={searchInput ? filteredTodos : todos}
            onEditTodo={handleEdit}
            onDeleteTodo={handleDelete}
            onCompleteTodo={handleComplete}
            sortAscending={sortAscending}
            sortDescending={sortDescending}
            sortDeadline={deadlineOrdering}
          />
        </div>
        <div
          style={{
            width: "50%",
            padding: "10px",
            overflowY: "scroll",
            height: "100%",
          }}
        >
          <DoneContainer
            todos={searchInput ? filteredDone : done}
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
