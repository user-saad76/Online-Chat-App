import express from 'express'
const server = express();
import 'dotenv/config'
import messageRoutes from "./Routes/message.routes.js";
import userRoutes from "./Routes/user.routes.js";
import bodyParser from 'body-parser';
import { connectDB } from './Config/db.js';
import cors from 'cors'
import { v2 as cloudinary } from "cloudinary";


const port = process.env.PORT || 6000;
connectDB().catch((e) => console.log("Error in Conection",e));



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;






server.use(cors())
server.use(bodyParser.json())
server.use(messageRoutes)
server.use(userRoutes)


server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})