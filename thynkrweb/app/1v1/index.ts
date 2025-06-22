import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { removePagePathTail } from "../../node_module2/next/dist/shared/lib/page-path/remove-page-path-tail";


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
 tugPosition: number; 
 answers: { [socketId: string]: string };
 players: string[];
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
 },
 {
  question: "Who is the best golfer in the world?",
  options: ["Benjamin Kwon", "Benji", "Ben", "BK"],
  correctAnswer: "Benjamin Kwon"
 },
 {
  question: "What is the name of the infamous couple",
  options: ["Jakura", "Jalivia", "Jaerin", "Evalyn"],
  correctAnswer: "Jakura"
 },
 {
  question: "What is the largest mammal?",
  options: ["Elephant", "Blue Whale", "Giraffe", "Hippo"],
  correctAnswer: "Blue Whale"
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
   gameStates[roomName] = { isActive: false, currentQuestionIndex: 0, tugPosition: 0, answers: {}, players: [] };
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
     gameStates[roomName] = { isActive: false, currentQuestionIndex: 0, tugPosition: 0, answers: {}, players: [] };
     io.emit("room list", Array.from(rooms));
   }
   socket.join(roomName);
   socket.emit("joined room", roomName);
   const room = io.sockets.adapter.rooms.get(roomName);
   if (gameStates[roomName] && room) {
     gameStates[roomName].players = Array.from(room);
   }
 });


 socket.on("start game", (roomName: string) => {
   if (!gameStates[roomName]) {
     gameStates[roomName] = { isActive: true, currentQuestionIndex: 0, tugPosition: 0, answers: {}, players: [] };
   } else {
     gameStates[roomName].isActive = true;
     gameStates[roomName].currentQuestionIndex = 0;
     gameStates[roomName].tugPosition = 0;
     gameStates[roomName].answers = {};
   }
   const room = io.sockets.adapter.rooms.get(roomName);
   if (room) {
     gameStates[roomName].players = Array.from(room);
     io.to(roomName).emit("game started");
     const firstQuestion = {
       question: questions[0].question,
       options: questions[0].options,
       questionNumber: 1,
       totalQuestions: questions.length
     };
     io.to(roomName).emit("question", firstQuestion);
     io.to(roomName).emit("tug position", gameStates[roomName].tugPosition);
   }
 });


socket.on("submit answer", ({ roomName, answer }: { roomName: string; answer: string }) => {
  const state = gameStates[roomName];
  if (state && state.isActive) {
    const currentQuestion = questions[state.currentQuestionIndex];
    state.answers[socket.id] = answer;
    const room = io.sockets.adapter.rooms.get(roomName);

    if (room) {
      const allAnswered = Array.from(room).every(socketId => state.answers[socketId] !== undefined);
      if (allAnswered) {
        let tugChange = 0;
        for (const playerId of state.players) {
          if (state.answers[playerId] === currentQuestion.correctAnswer) {
            if (playerId === state.players[0]) tugChange += 1;
            else if (playerId === state.players[1]) tugChange -= 1;
          }
        }
        state.tugPosition += tugChange;
        io.to(roomName).emit("tug position", state.tugPosition);
        state.currentQuestionIndex++;
        if (state.tugPosition >= 5 || state.tugPosition <= -5) {
          const winner = state.tugPosition >= 5 ? state.players[0] : state.players[1];
          io.to(roomName).emit("game ended", { winner, tugPosition: state.tugPosition });
          state.isActive = false;
        } else if (state.currentQuestionIndex < questions.length) {
          io.to(roomName).emit("question", {
            question: questions[state.currentQuestionIndex].question,
            options: questions[state.currentQuestionIndex].options,
            questionNumber: state.currentQuestionIndex + 1,
            totalQuestions: questions.length
          });
        } else {
          io.to(roomName).emit("game ended", { winner: null, tugPosition: state.tugPosition });
          state.isActive = false;
        }
          state.answers = {};
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
