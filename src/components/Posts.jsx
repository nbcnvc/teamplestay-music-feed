import { useState, useEffect } from "react";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../services/firebase";

function Posts() {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const name = data.name;
        const artist = data.artist;
        const title = data.title;
        const contents = data.contents;

        console.log(`${doc.id} => ${name}`);
        console.log(`${doc.id} => ${artist}`);
      });
    };
    fetchData();
  }, []);

  const [posts, setPosts] = useState([]);

  const addPost = async (event) => {
    event.preventDefault();
    const newPost = { name: name, airtist: artist };
    setPosts((prev) => {
      return [...posts, newPost];
    });
    setName("");
    setArtist("");

    const collectionRef = collection(db, "posts");
    await addDoc(collectionRef, newPost);
  };

  return (
    <div>
      <form onSubmit={addPost}>
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
    </div>
  );
}

export default Posts;
