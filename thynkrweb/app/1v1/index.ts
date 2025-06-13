import { Server } from "socket.io";
import express from "express";
import { createServer } from "node:http";
import { createClient } from '@supabase/supabase-js';


const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

io.on("connection", (socket) => {
  console.log('a user connected');

  socket.on("join room", async (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("chat message", ({ room, message }) => {
    console.log("Received chat message:", room, message);
    io.to(room).emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log('user disconnected');
  });
});

server.listen(3001, () => {
  console.log("Socket.io server running on port 3001");
});
