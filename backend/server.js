import express from 'express'
const server = express();
import 'dotenv/config'
import messageRoutes from "./Routes/message.routes.js";
import userRoutes from "./Routes/user.routes.js";
import adminRoutes from "./Routes/admin.routes.js";
import AdminMessagesRoutes from "./Routes/AdminMessage.routes.js";
//import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { connectDB } from './Config/db.js';
import cors from 'cors'



const port = process.env.PORT || 6000;
connectDB().catch((e) => console.log("Error in Conection",e));
server.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials:true
}));
//server.use(bodyParser.json())
server.use(cookieParser())
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(messageRoutes)
server.use(userRoutes)
server.use(adminRoutes)
server.use(AdminMessagesRoutes)


server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})
