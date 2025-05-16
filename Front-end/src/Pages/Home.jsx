import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import PoemList from "../Components/PoemList";
import PoemUpload from "../Components/PoemUpload";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
import './Footer.css';
import './Navbar.css';
import './Home.css';
import './PoemUpload.css';
import './PoemList.css';
import Chatbot from '../Components/Chatbot';
import './Chatbot.css';

function Home() {
  const { isAuthenticated, user } = useAuth0();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [poems, setPoems] = useState([]);
  

  // Fetch poems from the server
  const fetchPoems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/poems");
      setPoems(res.data);
    } catch (err) {
      console.error("Failed to fetch poems", err);
    }
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  return (
    <>
      <Navbar />
      <div className="Home-container">
        <div className="user-name">
          {isAuthenticated && (
            <h1>
              🥳 Welcome to Echoes of Soul, <span className="highlight-name">{user.name}😊</span>
            </h1>
          )}
        </div>

        <section className="first-sec">
          <div className="left-sec">
            <img className="bird-img" src="birdcouple.png" alt="bird-img" />
          </div>
          <div className="right-sec">
            <h1>Feel The Silence</h1>
            <p>
              "Not all feelings are meant to be spoken,<br />
              Some are too deep to be expressed,<br />
              So let's write them,<br />
              For those who feel the silence."
            </p>
          </div>
          <Chatbot /> 
        </section>

        {isAuthenticated && (
          <div className="upload-box">
            {user?.name && (
              <div className="user-initial-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <p>Click to craft your poem</p>
            <button
              className="upload-toggle-btn"
              onClick={() => setShowUploadForm(!showUploadForm)}
            >
              {showUploadForm ? "Close Upload" : "Upload a Poem"}
            </button>
          </div>
        )}

        {/* Upload Form */}
        {showUploadForm && (
          <PoemUpload setPoems={setPoems} poems={poems} />
        )}

        {/* Poem List */}
        <PoemList poems={poems} setPoems={setPoems} />  {/* Pass setPoems here */}
        <Footer />
      </div>
    </>
  );
}

export default Home;
