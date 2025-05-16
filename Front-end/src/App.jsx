import { useState, useEffect } from "react";
import "./App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
export default function Landing() {
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/home");
  }
  const [text, setText] = useState("");
  const [showGreetings, setShowGreetings] = useState(false); // State to control greetings visibility
  const [showButton, setShowButton] = useState(false);
  const fullText = "'' The heart writes what the lips cannot. ''"; // Change this to any text you want

  useEffect(() => {
    const startTyping = setTimeout(() => {
      setShowGreetings(true); // Show greetings after 6 seconds

      let i = 0;
      const interval = setInterval(() => {
        setText(fullText.slice(0, i + 1)); // Add one letter at a time
        i++;
        if (i === fullText.length) clearInterval(interval); // Stop when full text is typed
        setTimeout(() => {
          setShowButton(true); // Show button after text is fully typed
        }, 7000);
      }, 200); // Adjust speed of typing (200ms per letter)
    }, 6000); // Wait 6 seconds before starting typing

    return () => clearTimeout(startTyping);
  }, []);

  return (
    <>
    <div className="container">
      <video src="bg-vedio.mp4" autoPlay muted className="bg-video"></video>
      <div className="text-container">
      
      {showGreetings && <p className="greetings">Welcome To Echoes Of Soul</p>} 
        
      <p className="typing-text">{text}</p>
      {showButton && <button id="explore-btn" onClick={toHome}>Explore More</button>}
      </div>
    </div>
    </>
  );
}