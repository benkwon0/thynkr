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
interface GameState {
 isActive: boolean;
 currentQuestionIndex: number;
 scores: { [socketId: string]: number };
 answers: { [socketId: string]: string };
}
const gameStates: { [roomName: string] : GameState } = {};
const questions = [
 {
   question: "Who is the best pickleball player in the world?",
   options: ["Benjamin Kwon", "Benji", "Ben", "BK"],
   correctAnswer: "Benjamin Kwon"
 },
 {
   question: "Who is the best video game player in the world?",
   options: ["Benjamin Kwon", "Benji", "Ben", "BK"],
   correctAnswer: "Benjamin Kwon"
 }
];


const logRoomState = () => {
 console.log('Current rooms:', Array.from(rooms));
};


io.on("connection", (socket) => {
 console.log("User connected:", socket.id);
 socket.emit("room list", Array.from(rooms));
 logRoomState();


 socket.on("create room", (roomName: string) => {
   rooms.add(roomName);
   gameStates[roomName] = { isActive: false, currentQuestionIndex: 0, scores: {}, answers: {} };
   io.emit("room list", Array.from(rooms));
 });


 socket.on("delete room", (roomName: string) => {
   console.log(`Attempting to delete room: ${roomName}`);
   if (rooms.has(roomName)) {
     rooms.delete(roomName);
     delete gameStates[roomName];
     io.emit("room deleted", roomName);
     io.emit("room list", Array.from(rooms));
     console.log(`Room ${roomName} deleted, remaining rooms:`, Array.from(rooms));
   }
 });


 socket.on("join room", (roomName: string) => {
   if (!rooms.has(roomName)) {
     rooms.add(roomName);
     gameStates[roomName] = { isActive: false, currentQuestionIndex: 0, scores: {}, answers: {} };
     io.emit("room list", Array.from(rooms));
   }
   socket.join(roomName);
   socket.emit("joined room", roomName);
   if (gameStates[roomName]) {
     gameStates[roomName].scores[socket.id] = 0;
   }
 });


 socket.on("start game", (roomName: string) => {
   if (!gameStates[roomName]) {
     gameStates[roomName] = { isActive: true, currentQuestionIndex: 0, scores: {}, answers: {} };
   } else {
     gameStates[roomName].isActive = true;
     gameStates[roomName].currentQuestionIndex = 0;
     gameStates[roomName].scores = {};
     gameStates[roomName].answers = {};
   }
   const room = io.sockets.adapter.rooms.get(roomName);
   if (room) {
     room.forEach(socketId => { gameStates[roomName].scores[socketId] = 0; });
     io.to(roomName).emit("game started");
     const firstQuestion = {
       question: questions[0].question,
       options: questions[0].options,
       questionNumber: 1,
       totalQuestions: questions.length
     };
     io.to(roomName).emit("question", firstQuestion);
   }
 });


 socket.on("submit answer", ({ roomName, answer }: { roomName: string; answer: string }) => {
   if (gameStates[roomName] && gameStates[roomName].isActive) {
     const currentQuestion = questions[gameStates[roomName].currentQuestionIndex];
     gameStates[roomName].answers[socket.id] = answer;
     if (answer === currentQuestion.correctAnswer) {
       gameStates[roomName].scores[socket.id] = (gameStates[roomName].scores[socket.id] || 0) + 1;
     }
     const room = io.sockets.adapter.rooms.get(roomName);
     if (room) {
       const allAnswered = Array.from(room).every(socketId => gameStates[roomName].answers[socketId] !== undefined);
       if (allAnswered) {
         gameStates[roomName].currentQuestionIndex++;
         if (gameStates[roomName].currentQuestionIndex < questions.length) {
           io.to(roomName).emit("question", {
             question: questions[gameStates[roomName].currentQuestionIndex].question,
             options: questions[gameStates[roomName].currentQuestionIndex].options,
             questionNumber: gameStates[roomName].currentQuestionIndex + 1,
             totalQuestions: questions.length
           });
         } else {
           io.to(roomName).emit("game ended", gameStates[roomName].scores);
           gameStates[roomName].isActive = false;
         }
         gameStates[roomName].answers = {};
       }
     }
   }
 });


 socket.on("chat message", ({ room, message }: { room: string; message: string }) => {
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
