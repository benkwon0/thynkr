import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";


const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
 cors: {
   origin: "http://localhost:3000",
   methods: ["GET", "POST"]
 }
});

const rooms = new Set<string>();

const logRoomState = () => {
 console.log('Current rooms:', Array.from(rooms));
};

io.on("connection", (socket) => {
 console.log("User connected:", socket.id);

 socket.emit("room list", Array.from(rooms));
 logRoomState();

 socket.on("create room", (roomName: string) => {
   console.log(`Room creation requested: ${roomName} by ${socket.id}`);
  
   rooms.add(roomName);
   console.log(`Room created: ${roomName}`);
   logRoomState();

   io.emit("room list", Array.from(rooms));
 });
 
socket.on("delete room", (roomName: string) => {
  console.log(`Attempting to delete room: ${roomName}`);
  if (rooms.has(roomName)) {
    io.to(roomName).emit("room deleted", roomName);
    rooms.delete(roomName);
  
    io.emit("room list", Array.from(rooms));
    
    console.log(`Room ${roomName} deleted, remaining rooms:`, Array.from(rooms));
  }
});

 socket.on("join room", (roomName: string) => {
   console.log(`User ${socket.id} joining room: ${roomName}`);
  
   if (!rooms.has(roomName)) {
     console.log(`Room ${roomName} doesn't exist, creating it`);
     rooms.add(roomName);
     io.emit("room list", Array.from(rooms));
   }
  
   socket.join(roomName);
   socket.to(roomName).emit("chat message", `${socket.id} joined the room`);
 });


 socket.on("chat message", ({ room, message }: { room: string; message: string }) => {
   console.log(`Message in room ${room}: ${message}`);
   io.to(room).emit("chat message", `${socket.id}: ${message}`);
 });

 socket.on("disconnect", () => {
   console.log("User disconnected:", socket.id);
 });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
 logRoomState();
});
