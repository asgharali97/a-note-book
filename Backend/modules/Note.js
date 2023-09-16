const mongoose = require('mongoose')
const { Schema } = mongoose;

const  NoteSchema = new Schema({
    user:{
        type:String,
        ref:'user'
    },
    title:{
         type:String,
         required:true,
    },
    description:{
        type:String,
        require:true
    },
    tag:{
        type:String
    },
    date:{
        type: Date,
         default: Date.now
        }
});
module.exports = mongoose.model("Note", NoteSchema)