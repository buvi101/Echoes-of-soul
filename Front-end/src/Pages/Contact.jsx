import React, { useState, useEffect } from 'react';
import './Contact.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function Contact() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://echoes-of-soul-back-end.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ Name: '', Email: '', Message: '' });
        setIsSubmitted(true);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server.');
    }
  };

  // Auto-hide confirmation message after 5 seconds
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [isSubmitted]);

  return (
    <>
      <Navbar />
      <div className='contact-sec'>
        <section id='contact-container'>
        <div id='input-sec'>
          <h1>Contact Us</h1>

          <form className='contact-form' onSubmit={handleSubmit}>
            <input
              type="text"
              name="Name"
              placeholder="Enter your name"
              required
              value={formData.Name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="Email"
              placeholder="Enter your email"
              required
              value={formData.Email}
              onChange={handleChange}
            />
            <textarea
              name="Message"
              placeholder="Enter your message"
              required
              value={formData.Message}
              onChange={handleChange}
            ></textarea>
            <button className="submit-btn" type="submit">
              Send Message
            </button>
          </form>

          {isSubmitted && (
            <div className="confirmation-msg">
              ✅ Your message has been sent successfully!
            </div>
          )}
        </div>
        <div id='img-sec'>
          <img src="contact-us-img.gif" alt="Contact Us" />
        </div>
        </section>

        <Footer />
      </div>
      
      
    </>
  );
}

export default Contact;
