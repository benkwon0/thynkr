'use client';
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Page() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');

    socketRef.current.on("chat message", (msg: string) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      socketRef.current?.emit("chat message", inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      <style>{`
        #form {
          background: rgba(0, 0, 0, 0.15);
          padding: 0.25rem;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          height: 3rem;
          box-sizing: border-box;
          backdrop-filter: blur(10px);
        }
        #input {
          border: none;
          padding: 0 1rem;
          flex-grow: 1;
          border-radius: 2rem;
          margin: 0.25rem;
        }
        #input:focus {
          outline: none;
        }
        #form > button {
          background: #333;
          border: none;
          padding: 0 1rem;
          margin: 0.25rem;
          border-radius: 3px;
          outline: none;
          color: #fff;
        }
        #messages {
          list-style-type: none;
          margin: 0;
          padding: 0;
          margin-bottom: 3.5rem;
        }
        #messages > li {
          padding: 0.5rem 1rem;
        }
        #messages > li:nth-child(odd) {
          background: #efefef;
        }
      `}</style>

      <ul id="messages">
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
        <li ref={messagesEndRef} style={{ listStyle: "none", padding: 0, margin: 0 }} />
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
    </div>
  );
}
