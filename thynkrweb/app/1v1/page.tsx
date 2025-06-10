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

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');
    socketRef.current.on("chat message", (msg: string) => {
      console.log("Received on client:", msg)
      setMessages(prev => [...prev, msg]);
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (room.trim()) {
      socketRef.current?.emit("join room", room);
      setJoined(true);
      setMessages([]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() && room) {
      socketRef.current?.emit("chat message", inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      {!joined ? (
        <form onSubmit={handleJoin} style={{ margin: 20 }}>
          <input
            placeholder="Enter room name"
            value={room}
            onChange={e => setRoom(e.target.value)}
            style={{ padding: 8, borderRadius: 4, marginRight: 8 }}
          />
          <button type="submit">Join Room</button>
        </form>
      ) : (
        <>
          <ul id="messages">
            {messages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
            <li ref={messagesEndRef} />
          </ul>
          <form id="form" onSubmit={handleSubmit}>
            <input
              id="input"
              autoComplete="off"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
}
