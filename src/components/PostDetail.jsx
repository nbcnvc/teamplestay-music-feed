import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PostDetail = () => {
  const location = useLocation();
  const post = location.state?.post;
  const navigate = useNavigate();
  const [editedPost, setEditedPost] = useState(post);
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (event) => {
    setEditedPost({ ...editedPost, title: event.target.value });
  };

  const handleArtistChange = (event) => {
    setEditedPost({ ...editedPost, artist: event.target.value });
  };

  const handleReviewChange = (event) => {
    setEditedPost({ ...editedPost, review: event.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <>
      <h1>오늘의 pick</h1>
      {isEditing ? (
        <form>
          <label>
            Title:
            <input
              type="text"
              value={editedPost.title}
              onChange={handleTitleChange}
            />
          </label>
          <br />
          <label>
            Artist:
            <input
              type="text"
              value={editedPost.artist}
              onChange={handleArtistChange}
            />
          </label>
          <br />
          <label>
            Review:
            <textarea
              value={editedPost.review}
              onChange={handleReviewChange}
            ></textarea>
          </label>
          <br />
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      ) : (
        <>
          <p>Title: {editedPost.title}</p>
          <p>Artist: {editedPost.artist}</p>
          <p>Review: {editedPost.review}</p>
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
        </>
      )}
    </>
  );
};

export default PostDetail;
