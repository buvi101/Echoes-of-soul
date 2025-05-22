import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPaperPlane, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from "@auth0/auth0-react";


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { isAuthenticated } = useAuth0();

  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey dreamer! 🌸 How can I help you today?" }
  ]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim() === '') return;
  
    const userMessage = { from: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing...
    setIsTyping(true);
  
    // Simulate bot thinking for 2 seconds
    setTimeout(() => {
      const botMessage = generateBotReply(input);
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false); // Stop typing
    }, 2000);
  
    setInput('');
  };
  

  const generateBotReply = async (userInput) => {
    try {
      const res = await fetch("https://echoes-of-soul-chatbot-env.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
      });
  
      const data = await res.json();
      const botMessage = { from: "bot", text: data.reply };
  
      setMessages(prev => [...prev, botMessage]);  // Update messages with bot's reply
      setIsTyping(false); // Stop typing indicator
  
    } catch (err) {
      console.error("Error communicating with chatbot backend:", err);
      setMessages(prev => [...prev, { from: "bot", text: "Oops! Something went wrong. Please try again later." }]);
      setIsTyping(false); // Stop typing indicator
    }
  };
  
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      <div className={`chatbot ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          Echo
          <button className='bot-close' onClick={toggleChatbot}>
            <FontAwesomeIcon className='x-btn' icon={faXmark} />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.from}`}>
              {msg.text}
            </div>
          ))}

          {isTyping && (
            <div className="message bot typing">
              Echo is typing...
            </div>
          )}
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <button onClick={handleSend}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>

       {      
          isAuthenticated && (
            <button className="chatbot-toggle" onClick={toggleChatbot}>
        <FontAwesomeIcon icon={faHeadset} />
        </button>
          )}
    </div>
  );
};

export default Chatbot;
