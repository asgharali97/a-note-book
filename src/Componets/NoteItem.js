import React,{useContext} from "react";
import NoteContext from '../Context/notes/noteContext'
import "./Navbar.css"
const NoteItem = (props) => {
  const context =useContext(NoteContext)
  const {deleteNote} = context
  const {note,updateNote} = props;
  return (
    <>
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text my-3">{note.description}</p>
            <hr></hr>
              <li className="list-group-item">{note.tag}</li>
            <div id="icon" className="d-flex justify-content-between ">
              <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id); props.Showalert(" Deleted successfuly ", "success")}} style={{ color: "#000000" }}></i>
              <i className="fa-solid fa-pen-to-square mx-2"onClick={()=>{updateNote(note)}} style={{ color: "#000000" }}></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
