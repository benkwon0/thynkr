'use client';
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Page() {
 const [messages, setMessages] = useState<string[]>([]);
 const [inputValue, setInputValue] = useState("");
 const [room, setRoom] = useState("");
 const [joined, setJoined] = useState(false);
 const socketRef = useRef<Socket | null>(null);
 const messagesEndRef = useRef<HTMLLIElement | null>(null);
 const [question, setQuestion] = useState("");
 const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
 const [availableRooms, setAvailableRooms] = useState<string[]>([]);
 const [newRoomName, setNewRoomName] = useState("");
 const [isConnected, setIsConnected] = useState(false);


 useEffect(() => {
   const socket = io('http://localhost:3001', {
     reconnection: true,
     reconnectionAttempts: 5,
     reconnectionDelay: 1000
   });
   socketRef.current = socket;

   socket.on('connect', () => {
     console.log('Connected to server, socket ID:', socket.id);
     setIsConnected(true);
   });

   socket.on('room deleted', (deletedRoom: string) => {
    console.log('Room deleted event received:', deletedRoom);
    if (room === deletedRoom) {
      setJoined(false);
      setRoom("");
      setMessages([]);
      setCurrentQuestion(null);
      alert(`Room "${deletedRoom}" has been deleted.`);
      socketRef.current?.emit('get rooms');
    }
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


   socket.on('chat message', (msg: string) => {
     console.log('Received message:', msg);
     setMessages(prev => [...prev, msg]);
   });


   socket.on('question', (q: string) => {
     console.log('Received question:', q);
     setCurrentQuestion(q);
   });

   return () => {
     console.log('Cleaning up socket connection');
     socket.disconnect();
   };
 }, [room]);


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

 const handleDeleteRoom = (roomName: string) => {
  if (isConnected && availableRooms.includes(roomName)) {
    console.log('Deleting room:', roomName);
    socketRef.current?.emit('delete room', roomName);
    setJoined(false);
  }
 };


 const handleJoin = (roomName: string) => {
   if (isConnected) {
     console.log('Joining room:', roomName);
     socketRef.current?.emit('join room', roomName);
     setRoom(roomName);
     setJoined(true);
     setMessages([]);
   } else {
     console.log('Cannot join room: not connected');
   }
 };


 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   if (inputValue.trim() && room && isConnected) {
     socketRef.current?.emit('chat message', { room, message: inputValue });
     setInputValue("");
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
         Not connected to server. Try again.
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
           <p>No rooms available. Create one yourself!</p>
         )}
       </div>
     ) : (
       <>
         <div style={{ marginBottom: 20 }}>
           <h3>Room: {room}</h3>
           <button
             onClick={() => handleDeleteRoom(room)}
             style={{
               padding: '8px 16px',
               background: '#E37573',
               color: 'white',
               border: 'none',
               borderRadius: 4,
               cursor: 'pointer',
               marginRight: 8
             }}
           >
             Delete Room
           </button>
           <button
             onClick={() => {
               setJoined(false);
               setRoom("");
               setMessages([]);
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
         {currentQuestion && (
           <div style={{ margin: 20, padding: 10, background: "#f0f0f0", borderRadius: 8 }}>
             <strong>Question:</strong> {currentQuestion}
           </div>
         )}
       </>
     )}
   </div>
 );
}
