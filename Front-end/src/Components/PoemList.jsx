import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const PoemList = ({ poems, setPoems }) => {
  const { user, isAuthenticated } = useAuth0();
  const [commentText, setCommentText] = useState({});
  const [error, setError] = useState(null);

  // ✅ Handle Like Button Click
  const handleLike = async (poemId) => {
    if (!isAuthenticated || !user?.email) {
      alert("You must be logged in to like a poem.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/poems/like/${poemId}`, {
        userEmail: user.email,
      });

      // 🔄 Update that specific poem locally
      const updatedPoems = poems.map((poem) =>
        poem._id === poemId ? { ...poem, likes: response.data.likes } : poem
      );
      setPoems(updatedPoems);
    } catch (err) {
      if (
        err.response &&
        err.response.data.message === "User already liked this poem"
      ) {
        alert("You already liked this poem.");
      } else {
        console.error("Error liking poem:", err);
      }
    }
  };

  // ✅ Handle Comment Submission
  const handlePostComment = async (poemId) => {
    if (!isAuthenticated || !user?.email) {
      alert("You must be logged in to comment.");
      return;
    }

    const text = commentText[poemId] || "";
    if (!text.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/poems/comment/${poemId}`,
        {
          userEmail: user.email,
          text,
        }
      );

      const updatedPoems = poems.map((poem) =>
        poem._id === poemId
          ? {
              ...poem,
              comments: [...poem.comments, response.data.comment],
            }
          : poem
      );

      setPoems(updatedPoems);
      setCommentText((prev) => ({ ...prev, [poemId]: "" }));
      setError(null);
    } catch (err) {
      setError("Failed to post comment. Please try again.");
      console.error("Error posting comment:", err);
    }
  };

  const handleCommentChange = (poemId, value) => {
    setCommentText((prev) => ({ ...prev, [poemId]: value }));
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div className="poem-list">
      {poems.map((poem) => (
        <div key={poem._id} className="poem-card">
          <h2>{poem.title}</h2>
          <p>{poem.content}</p>
          <p>
            <em>— {poem.author}</em>
          </p>
          <div className="poem-actions">
            <button onClick={() => handleLike(poem._id)}>
              ❤️ {poem.likes?.length ?? 0}
            </button>

            <div className="text">
              <textarea
                value={commentText[poem._id] || ""}
                onChange={(e) => handleCommentChange(poem._id, e.target.value)}
                placeholder="Write a comment..."
                
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                className="comment-button"
                onClick={() => handlePostComment(poem._id)}
              >
                Post
              </button>
            </div>
            <br />
            <div className="comments-section">
              {poem.comments?.length > 0 ? (
                poem.comments.map((comment) => (
                  <div key={comment._id || `${comment.userEmail}-${comment.text}`} className="comment">
                    <p>
                      <strong>{comment.userEmail}</strong>: {comment.text}
                      <br />
                      <small>{formatTimestamp(comment.timestamp)}</small>
                    </p>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PoemList;