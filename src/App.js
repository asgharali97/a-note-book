import './App.css'
import Home from "./Componets/Home";
import Navbar from "./Componets/Navbar";
import About from "./Componets/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import Alert from './Componets/Alert'
import Login from './Componets/Login'
import Signup from './Componets/Signup'
import {useState} from 'react'
function App() {
  const [alert, setAlert] = useState(null);

  const Showalert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }
  return (
    <>
     <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home Showalert={Showalert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login Showalert={Showalert} />} />
          <Route exact path="/signup" element={<Signup Showalert={Showalert} />} />
        </Routes>
        </div>
      </Router>
     </NoteState>
    </>
  );
}

export default App;
