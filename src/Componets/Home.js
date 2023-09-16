import React from 'react'
import Notes from './Notes'
const Home = (props) => {
  const {Showalert} = props
  return (
    <>    
    <Notes Showalert={Showalert}/>
  
    </>
  )
}

export default Home
