import React, { useState } from "react";
import { SiChatbot } from "react-icons/si";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am your Agriculture Specialist. Ask me anything about farming, crops, soil, or weather. Be concise", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => {
    setOpen(!open);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;
  
    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
  
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAnSh2zOCFrYd3yh_eD7Jf8frFgJLcSXtY`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: input }]
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      console.log("Gemini API Response:", response.data);
  
      const botResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm not sure. Please ask about agriculture!";
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" }
      ]);
    } catch (error) {
      console.error(
        "Error fetching response from Gemini API:",
        error.response?.data || error.message
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, I couldn't fetch a response.", sender: "bot" }
      ]);
    }
  };
  
  

  return (
    <div className="chatbot-container">
      <div className="chat-icon" onClick={toggleChatbot}>
        <SiChatbot />
      </div>

      {open && (
        <div className="chatbox">
          <div className="chat-header">
            <span>Agriculture Chatbot</span>
            <button className="close-btn" onClick={toggleChatbot}>×</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask about crops, weather, farming tips..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
