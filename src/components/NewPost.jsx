import { useState } from "react";
import { createData } from "../services/firestore";

const NewPost = () => {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");

  const addHandler = async (event) => {
    event.preventDefault();

    const newPost = { title: name };
    setPosts((prev) => {
      return [...prev, newPost];
    });
    setName("");
    setArtist("");

    createData(newPost);
  };

  return (
    <form onSubmit={addHandler}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
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
