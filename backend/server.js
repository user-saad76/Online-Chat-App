import express from 'express'
const server = express();
import 'dotenv/config'
import messageRoutes from "./Routes/message.routes.js";
import bodyParser from 'body-parser';


const port = process.env.PORT || 6000;

server.use(bodyParser.json())
server.use(messageRoutes)


server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})