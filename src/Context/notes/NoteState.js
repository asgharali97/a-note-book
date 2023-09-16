import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:4000";
  const notesIntial = [];
  const [notes, setNote] = useState(notesIntial);
  // Get All Notes
  const getNotes = async () => {
    const authToken = localStorage.getItem('token');
    console.log('Auth Token:', authToken);
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
    });
    const json = await response.json();
    setNote(json);
    console.log(json)
  };
  // Add Note
  const addNote = async (title, description, tag) => {

    const authToken = localStorage.getItem('token');
    console.log('Auth Token:', authToken);
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken

      },
      body: JSON.stringify({ title, description, tag })
    });


    console.log("Adding a new note")
    const note = await response.json();

    setNote(notes.concat(note))
  }
  // Delete Note
  const deleteNote = async (id) => {
    const authToken = localStorage.getItem('token');
    console.log('Auth Token:', authToken);
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
    });
    const json = response.json();
    console.log(json);

    console.log("deleting note" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNote(newNote);
  };
  // Edit Note
  const editNote = async (id, title, description, tag) => {
    const authToken = localStorage.getItem('token');
    console.log('Auth Token:', authToken);
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNote(newNotes);
  }
  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
