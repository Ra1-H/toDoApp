// Import required modules
const express = require("express");
const app = express();
const PORT = 3001; // Choose any available port

// Middleware to parse JSON requests
app.use(express.json());

// Sample in-memory data store for notes
let notes = [];

// Endpoint to list notes (GET)
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Endpoint to get details of one note (GET)
app.get("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const note = notes.find((note) => note.id === parseInt(noteId));

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

// Endpoint to create a new note (POST)
app.post("/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = notes.length + 1;
  notes.push(newNote);

  res.status(201).json(newNote);
});

// Endpoint to update a note (PUT)
app.put("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const updatedNote = req.body;

  notes = notes.map((note) => {
    if (note.id === parseInt(noteId)) {
      return { ...note, ...updatedNote };
    }
    return note;
  });

  // Endpoint to delete a note (DELETE)
  app.delete("/notes/:id", (req, res) => {
    const noteId = req.params.id;
    notes = notes.filter((note) => note.id !== parseInt(noteId));

    res.json({ message: "Note deleted successfully" });
  });

  res.json({ message: "Note updated successfully" });
});

// Simple endpoint to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
