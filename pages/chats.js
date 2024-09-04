
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context";
import io from "socket.io-client";


export default function Chats() {
  const isBrowser = typeof window !== "undefined";
  const isProd = process.env.NODE_ENV === "production";
  const backendBaseUrl = "http://localhost:4000";
  // const baseUrl = window.location.origin;
  const baseUrl = isProd ? "https://chat-app-two-black.vercel.app" : "http://localhost:4000";
  const { username } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  console.table({baseUrl, isBrowser})

  const socket = io(baseUrl, {
    withCredentials: true,
  });

  useEffect(() => {
    
    if (isBrowser) {
      setShowChat(true);
    }

    if (socket) {
      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit("sendMessage", { username, text: message });
      setMessage("");
    } else {
      console.error("Socket not initialized");
    }
  };

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="chat-container">
        <div className="chat-section">
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.username}</strong>: {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}


// // https://chat-g5c2bbgo3-marys-projects-cf8a8ef9.vercel.app
