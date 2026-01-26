import express from 'express'
const server = express();
import 'dotenv/config'
import messageRoutes from "./Routes/message.routes.js";
import bodyParser from 'body-parser';
import { connectDB } from './Config/db.js';


const port = process.env.PORT || 6000;
connectDB().catch((e) => console.log("Error in Conection",e));

server.use(bodyParser.json())
server.use(messageRoutes)


server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})