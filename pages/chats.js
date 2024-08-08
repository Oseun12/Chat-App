import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import io from "socket.io-client";

const socket = io("http://localhost:4000", {
  withCredentials: true,
});
// https://chat-g5c2bbgo3-marys-projects-cf8a8ef9.vercel.app
export default function Chats() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log("Document check:", typeof document !== "undefined");
    if (typeof document !== "undefined") {
      setShowChat(true);
      console.log("Chat should be visible now.");
    }

    socket.on("receiveMessage", (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    console.log("Sending message:", { username, text: message });
    socket.emit("sendMessage", { username, text: message });
    setMessage("");
  };

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="chat-container">
        <div className="member-list">
          
        </div>
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
