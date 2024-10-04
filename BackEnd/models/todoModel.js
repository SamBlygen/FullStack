// bring in mongoose for structuring data and validation
import mongoose from "mongoose";

// create a schema to validate our data and determine what it looks like
const todoSchema = mongoose.Schema({
    // field must be a string (data validation)
    text: { type: String },
    // field must be a boolean 
    completed: { type: Boolean, default: false }
})

// create our model with the schema (first parameter is collection name)
const Todo = mongoose.model('todos', todoSchema)

// need our model in our server to interact with todo documents 
export default Todo
