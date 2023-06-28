import { useState } from "react";
import { createData } from "../services/firestore";
import { auth } from "../services/firebase";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [posts, setPosts] = useState("");

  const addHandler = async (event) => {
    event.preventDefault();

    const newPost = { userId: auth.currentUser.uid, title, artist };
    setPosts((prev) => {
      return [...prev, newPost];
    });
    setTitle("");
    setArtist("");

    createData(newPost);
  };

  return (
    <form onSubmit={addHandler}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        name="artist"
        value={artist}
        onChange={(e) => {
          setArtist(e.target.value);
        }}
      />
      <button>등록하기</button>
    </form>
  );
};

export default NewPost;
