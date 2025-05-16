import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const PoemUpload = ({ poems, setPoems }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user, isAuthenticated } = useAuth0();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    try {
      const res = await axios.post("http://localhost:5000/api/poems", {
        title,
        content,
        author: user.email,
      });

      const newPoem = res.data;
      setPoems([newPoem, ...poems]);

      setTitle("");
      setContent("");
      alert("Are you sure you want to upload this poem?");
    } catch (err) {
      console.error("Failed to upload", err);
    }
  };

  return (
    <form className="poem-upload-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Poem content"
        required
      />
      <button type="submit">Upload Poem</button>
    </form>
  );
};

export default PoemUpload;
