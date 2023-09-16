import React,{useContext,useState} from 'react'
import NoteContext from '../Context/notes/noteContext'
import './Navbar.css'

const AddNote = () => {
  const context =useContext(NoteContext)
  const {addNote} = context
  const [note,setNote]= useState({title : "",description:"",tag:""})

  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag)
    setNote({ title: '', description: '', tag: '' });
   
  }
  const onChange=(e)=>{
 setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
    <h1 className='homeHead'> Add Note here </h1>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control"onChange={onChange}value={note.title} id="title"name='title'minLength={3} required aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control"onChange={onChange}value={note.description} name='description'minLength={5} required id="description"/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" onChange={onChange}value={note.tag} name="tag"id="tag"/>
  </div>
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={handleClick} className="btn btn-dark homeHead">Save Note</button>
</form>
    </>
  )
}

export default AddNote
