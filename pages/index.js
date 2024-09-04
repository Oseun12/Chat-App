import React, { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";

export default function Auth() {
  const { username, setUsername, secret, setSecret } = useContext(Context); 
  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();
    if (username.length === 0 || secret.length === 0) return;
    // Simulate authentication
    router.push("/chats");
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">Group Chat</div>
          <div className="input-container">
            <input 
              placeholder="Username" 
              className="text-input" 
              onChange={e => setUsername(e.target.value)} 
            />
          </div>
          <div className="input-container">
            <input 
              type="password" 
              placeholder="Password" 
              className="text-input" 
              onChange={e => setSecret(e.target.value)} 
            />
          </div>
          <button type="submit" className="submit-button">Join</button>
        </form>
      </div>
    </div>
  );
}
