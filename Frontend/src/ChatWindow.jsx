import React, { useContext, useState, useEffect } from "react";
import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    prevChats,
    setPrevChats,
    setNewChat
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen,setIsOpen] = useState(false);

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const res = await response.json();
      console.log(res);
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  //append new chat to prev chat
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
    }
    setPrompt("");
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='chatWindow'>
      <div className='navbar'>
        <span>
          RohitGPT <i className='fa-solid fa-angle-down'></i>
        </span>
        <div className='userIconDiv' onClick={handleProfileClick}>
          <span className='userIcon'>
            <i className='fa-solid fa-user'></i>
          </span>
        </div>

      </div>
      {
        isOpen && 
        <div className="dropDown">
          <div className="dropdownItem"><i class="fa-solid fa-cloud-arrow-up"></i>Upgrade Plan</div>
          <div className="dropdownItem"><i class="fa-solid fa-gear"></i>Settings</div>
          <div className="dropdownItem"><i class="fa-solid fa-circle-info"></i>Help</div>
          <div className="dropdownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i>Log out</div>
        </div>
      }
      <Chat />

      <div className='loader-container'>
        <ScaleLoader color='#fff' loading={loading} />
      </div>
      <div className='chatInput'>
        <div className='inputBox'>
          <input
            placeholder='Ask Anything'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.getkey === "Enter" ? getReply() : "")}
          />
          <div id='submit' onClick={getReply}>
            <i className='fa-solid fa-paper-plane'></i>
          </div>
        </div>
        <p className='info'>
          RohitGPT can make mistakes. Check important info. See Cookie
          Preferences.
        </p>
      </div>
    </div>
  );
}
export default ChatWindow;
