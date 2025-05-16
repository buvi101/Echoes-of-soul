import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./MyPoems.css"; 
import Navbar from '../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';


const MyPoems = () => {
  const [poems, setPoems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`http://localhost:5000/api/poems`)
        .then((res) => {
          const userPoems = res.data.filter(
            (poem) => poem.author === user.name || poem.author === user.email
          );
          setPoems(userPoems);
        })
        .catch((err) => console.error("Error fetching user's poems:", err));
    }
  }, [isAuthenticated, user]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this poem?")) {
      axios
        .delete(`http://localhost:5000/api/poems/${id}`)
        .then(() => {
          setPoems((prev) => prev.filter((poem) => poem._id !== id));
        })
        .catch((err) => console.error("Error deleting poem:", err));
    }
  };

  const handleEdit = (poem) => {
    setEditingId(poem._id);
    setEditedTitle(poem.title);
    setEditedContent(poem.content);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedTitle("");
    setEditedContent("");
  };

  const handleSave = (id) => {
    axios
      .put(`http://localhost:5000/api/poems/${id}`, {
        title: editedTitle,
        content: editedContent,
      })
      .then((res) => {
        setPoems((prev) =>
          prev.map((poem) => (poem._id === id ? res.data : poem))
        );
        handleCancel();
      })
      .catch((err) => console.error("Error saving changes:", err));
  };

  return (
    <>
    <Navbar/>
    <div className="mypoems-box">
     <div className="my-poems-container">
      {/* <h2>My Poems</h2> */}
      {poems.length === 0 ? (
        // <p>You haven’t uploaded any poems yet.</p>
        <div className="no-poems-message">
          <FontAwesomeIcon className="sad-face" icon={faFaceFrown} />

          <h2>You haven’t uploaded any</h2>
          <h2>poems yet.</h2>
          <p>Start writing your poem!</p>
        </div>
           
      ) : (
        poems.map((poem) => (
          <div key={poem._id} className="poem-card">
            {editingId === poem._id ? (
              <div className="edit-mode">
                <input className="edit-title"
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Edit title"
                />
                <textarea className="edit-content"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  placeholder="Edit content"
                  rows="5"
                />
                <div className="btn-group">
                  <button className="save-btn" onClick={() => handleSave(poem._id)}>Save</button>
                  <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h3>{poem.title}</h3>
                <p>{poem.content}</p>
                <div className="poem-actions">
                  <button className="edit-btn" onClick={() => handleEdit(poem)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(poem._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
     </div>
    </div>
    </>
  );
};

export default MyPoems;
