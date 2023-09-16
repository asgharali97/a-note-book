const mongoose = require ('mongoose')

const connect =async()=>{

    const c = await mongoose.connect("mongodb://0.0.0.0:27017/A-note-M")
   .then(()=>{
       console.log("mongodb connected");
   })
   .catch(()=>{
       console.log('failed');
   })
 }
 
 module.exports=connect        