'use client';
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";


interface Question {
 question: string;
 options: string[];
 questionNumber: number;
 totalQuestions: number;
}


interface Scores {
 [socketId: string]: number;
}


export default function Page() {
 const [messages, setMessages] = useState<string[]>([]);
 const [inputValue, setInputValue] = useState("");
 const [room, setRoom] = useState("");
 const [joined, setJoined] = useState(false);
 const socketRef = useRef<Socket | null>(null);
 const messagesEndRef = useRef<HTMLLIElement | null>(null);
 const [availableRooms, setAvailableRooms] = useState<string[]>([]);
 const [newRoomName, setNewRoomName] = useState("");
 const [isConnected, setIsConnected] = useState(false);
 const [gameActive, setGameActive] = useState(false);
 const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
 const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
 const [finalScores, setFinalScores] = useState<Scores | null>(null);


 useEffect(() => {
   const socket = io('http://localhost:3001', {
     reconnection: true,
     reconnectionAttempts: 5,
     reconnectionDelay: 1000
   });
   socketRef.current = socket;


   socket.onAny((event, ...args) => {
     console.log('Socket event:', event, args);
   });


   socket.on('connect', () => {
     console.log('Connected to server, socket ID:', socket.id);
     setIsConnected(true);
   });


   socket.on('connect_error', (error) => {
     console.error('Connection error:', error);
     setIsConnected(false);
   });


   socket.on('disconnect', () => {
     console.log('Disconnected from server');
     setIsConnected(false);
   });


   socket.on('room list', (rooms: string[]) => {
     console.log('Received room list update:', rooms);
     setAvailableRooms(rooms);
   });


   socket.on('room deleted', (deletedRoom: string) => {
     console.log('Room deleted event received:', deletedRoom);
     if (room === deletedRoom) {
       setJoined(false);
       setRoom("");
       setMessages([]);
       setGameActive(false);
       setCurrentQuestion(null);
       setFinalScores(null);
       alert(`Room "${deletedRoom}" has been deleted.`);
     }
   });


   socket.on('chat message', (msg: string) => {
     console.log('Received message:', msg);
     setMessages(prev => [...prev, msg]);
   });


   socket.on('game started', () => {
     console.log('Game started event received');
     setGameActive(true);
     setFinalScores(null);
     setCurrentQuestion(null);
   });


   socket.on('question', (question: Question) => {
     console.log('Received question event:', question);
     setCurrentQuestion(question);
     setSelectedAnswer(null);
   });


   socket.on('game ended', (scores: Scores) => {
     console.log('Game ended, final scores:', scores);
     setGameActive(false);
     setFinalScores(scores);
     setCurrentQuestion(null);
   });


   socket.on('joined room', (joinedRoom: string) => {
     console.log('Server confirmed join:', joinedRoom);
     setJoined(true);
     setRoom(joinedRoom);
     setMessages([]);
     setGameActive(false);
     setCurrentQuestion(null);
     setFinalScores(null);
   });


   return () => {
     console.log('Cleaning up socket connection');
     socket.disconnect();
   };
 }, []);


 useEffect(() => {
   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
 }, [messages]);


 const handleCreateRoom = (e: React.FormEvent) => {
   e.preventDefault();
   if (newRoomName.trim() && isConnected) {
     const roomName = newRoomName.trim();
     console.log('Creating room:', roomName);
     socketRef.current?.emit('create room', roomName);
     setNewRoomName("");
   } else {
     console.log('Cannot create room: not connected or empty name');
   }
 };


 const handleJoin = (roomName: string) => {
   if (isConnected) {
     console.log('Joining room:', roomName);
     socketRef.current?.emit('join room', roomName);
     console.log('Emitted join room event to server:', roomName);

   } else {
     console.log('Cannot join room: not connected');
   }
 };


 const handleStartGame = () => {
   if (isConnected && room) {
     console.log('Starting game in room:', room);
     setGameActive(true);
     setFinalScores(null);
     setCurrentQuestion(null);
     socketRef.current?.emit('start game', room);
   } else {
     console.log('Cannot start game: not connected or no room');
   }
 };


 const handleSubmitAnswer = (answer: string) => {
   if (isConnected && room && gameActive) {
     console.log('Submitting answer:', answer);
     setSelectedAnswer(answer);
     socketRef.current?.emit('submit answer', { roomName: room, answer });
   }
 };


 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   if (inputValue.trim() && room && isConnected) {
     socketRef.current?.emit('chat message', { room, message: inputValue });
     setInputValue("");
   }
 };


 const handleDeleteRoom = (roomName: string) => {
   if (isConnected && availableRooms.includes(roomName)) {
     console.log('Deleting room:', roomName);
     socketRef.current?.emit('delete room', roomName);
     setJoined(false);
   }
 };


 return (
   <div style={{ padding: 20 }}>
     {!isConnected && (
       <div style={{
         padding: 10,
         background: '#ffebee',
         color: '#c62828',
         marginBottom: 20,
         borderRadius: 4
       }}>
         Not connected to server. Please refresh the page.
       </div>
     )}
    
     {!joined ? (
       <div>
         <h2>Create a Room</h2>
         <form onSubmit={handleCreateRoom} style={{ marginBottom: 20 }}>
           <input
             placeholder="Enter room name"
             value={newRoomName}
             onChange={e => setNewRoomName(e.target.value)}
             style={{ padding: 8, borderRadius: 4, marginRight: 8 }}
             disabled={!isConnected}
           />
           <button
             type="submit"
             disabled={!isConnected}
             style={{
               opacity: isConnected ? 1 : 0.5,
               cursor: isConnected ? 'pointer' : 'not-allowed'
             }}
           >
             Create Room
           </button>
         </form>


         <h2>Available Rooms</h2>
         {availableRooms.length > 0 ? (
           <ul style={{ listStyle: 'none', padding: 0 }}>
             {availableRooms.map((roomName) => (
               <li key={roomName} style={{ marginBottom: 10 }}>
                 <button
                   onClick={() => handleJoin(roomName)}
                   disabled={!isConnected}
                   style={{
                     padding: '8px 16px',
                     background: '#7da068',
                     color: 'white',
                     border: 'none',
                     borderRadius: 4,
                     cursor: isConnected ? 'pointer' : 'not-allowed',
                     width: '100%',
                     textAlign: 'left',
                     opacity: isConnected ? 1 : 0.5
                   }}
                 >
                   Join Room: {roomName}
                 </button>
               </li>
             ))}
           </ul>
         ) : (
           <p>No rooms available. Create one above!</p>
         )}
       </div>
     ) : (
       <>
         <div style={{ marginBottom: 20 }}>
           <h3>Room: {room}</h3>
           <div style={{ display: 'flex', gap: '10px' }}>
             {!gameActive && !finalScores && (
               <button
                 onClick={handleStartGame}
                 style={{
                   padding: '8px 16px',
                   background: '#4CAF50',
                   color: 'white',
                   border: 'none',
                   borderRadius: 4,
                   cursor: 'pointer'
                 }}
               >
                 Start Game
               </button>
             )}
             <button
               onClick={() => handleDeleteRoom(room)}
               style={{
                 padding: '8px 16px',
                 background: '#E37573',
                 color: 'white',
                 border: 'none',
                 borderRadius: 4,
                 cursor: 'pointer'
               }}
             >
               Delete Room
             </button>
             <button
               onClick={() => {
                 setJoined(false);
                 setRoom("");
                 setMessages([]);
                 setGameActive(false);
                 setCurrentQuestion(null);
                 setFinalScores(null);
               }}
               style={{
                 padding: '8px 16px',
                 background: '#aaa',
                 color: 'white',
                 border: 'none',
                 borderRadius: 4,
                 cursor: 'pointer'
               }}
             >
               Leave Room
             </button>
           </div>
         </div>
         {gameActive && currentQuestion && (
           <div style={{
             padding: 20,
             background: '#f5f5f5',
             borderRadius: 8,
             marginBottom: 20
           }}>
             <h3>Question {currentQuestion.questionNumber} of {currentQuestion.totalQuestions}</h3>
             <p style={{ fontSize: '1.2em', marginBottom: 20 }}>{currentQuestion.question}</p>
             <div style={{ display: 'grid', gap: 10 }}>
               {currentQuestion.options.map((option) => (
                 <button
                   key={option}
                   onClick={() => handleSubmitAnswer(option)}
                   disabled={selectedAnswer !== null}
                   style={{
                     padding: '12px 20px',
                     background: selectedAnswer === option ? '#4CAF50' : '#fff',
                     color: selectedAnswer === option ? 'white' : '#333',
                     border: '1px solid #ddd',
                     borderRadius: 4,
                     cursor: selectedAnswer === null ? 'pointer' : 'default',
                     textAlign: 'left',
                     fontSize: '1em'
                   }}
                 >
                   {option}
                 </button>
               ))}
             </div>
           </div>
         )}
         {finalScores && (
           <div style={{
             padding: 20,
             background: '#e3f2fd',
             borderRadius: 8,
             marginBottom: 20
           }}>
             <h3>Game Over!</h3>
             <h4>Final Scores:</h4>
             <ul style={{ listStyle: 'none', padding: 0 }}>
               {Object.entries(finalScores).map(([playerId, score]) => (
                 <li key={playerId} style={{
                   padding: '8px 0',
                   borderBottom: '1px solid #90caf9'
                 }}>
                   Player {playerId}: {score} points
                 </li>
               ))}
             </ul>
           </div>
         )}
         <ul id="messages" style={{
           listStyle: 'none',
           padding: 10,
           maxHeight: '400px',
           overflowY: 'auto',
           border: '1px solid #ccc',
           borderRadius: 4
         }}>
           {messages.map((msg, i) => (
             <li key={i} style={{ marginBottom: 8 }}>{msg}</li>
           ))}
           <li ref={messagesEndRef} />
         </ul>
         <form id="form" onSubmit={handleSubmit} style={{ marginTop: 20 }}>
           <input
             id="input"
             autoComplete="off"
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             style={{
               padding: 8,
               borderRadius: 4,
               border: '1px solid #ccc',
               width: 'calc(100% - 100px)',
               marginRight: 8
             }}
           />
           <button type="submit" style={{
             padding: '8px 16px',
             background: '#7da068',
             color: 'white',
             border: 'none',
             borderRadius: 4,
             cursor: 'pointer'
           }}>Send</button>
         </form>
       </>
     )}
   </div>
 );
}


