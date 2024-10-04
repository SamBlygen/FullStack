import mongoose from "mongoose";
import { configDotenv } from "dotenv";

async function connectDB(){
  try{
    
await mongoose.connect(process.env.MONGO_URL)
console.log('Mongodb')
  }catch {
    console.log(e)
  }
  
}
export default connectDB