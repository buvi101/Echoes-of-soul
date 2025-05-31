import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import './Navbar.css';
import './About.css';
import SplineViewer from '../Components/3Dbot';
import './3Dbot.css';


function About() {
  return (
    <>
      <Navbar />
      
      <div className="about-container">
        <SplineViewer />

        <section id='mission-sec'>
          <h1>Mission</h1>
          <p>
            "Our mission is to create a digital haven for poetry — a place where creativity breathes, 
            emotions are honored, and the soul finds a stage."
          </p>
        </section >

        

        <section id='feature-sec'>
          <h1>What You Can Do</h1>
          <ul>
            <li>✍️ Post your own poems</li>
            <li>❤️ Like poems that touch your heart</li>
            <li>💬 Comment and connect with fellow writers</li>
            <li>🔐 Secure login to build your personal space</li>
          </ul>
        </section>

        <section id='for-sec'>
          <h1>Who It's For</h1>
          <p>
            "Echoes of Soul is for dreamers, lovers of words, the heartbroken, the hopeful, 
            and those who feel more than they can say."
          </p>
        </section>
        <Footer />
      </div>
      
    </>
  );
}

export default About;
