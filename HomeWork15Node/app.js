import express from 'express';
import {createServer} from 'http';
import { Server as SocketIOServer } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';


const PORT=3000;

const app=express();
const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);
const httpServer=createServer(app);
const io=new SocketIOServer(httpServer);

io.on('connection', (socket)=>{
console.log('User connected:${socket.id}');

socket.on('chat:message', (text)=>{
    console.log(`Message from:${socket.id}:${text}`);

socket.emit('chat:ack', `message received:'${text}'`)
});

socket.on('disconnect', (reason)=>{
    console.log(` User disconnected:${socket.id}`)
});
});


app.use(express.static(path.join(_dirname, "public")))

httpServer.listen(PORT,()=>{
console.log(`Server is connected on: http://localhost:${PORT}`);
})


