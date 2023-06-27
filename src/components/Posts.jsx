import { useState, useEffect } from "react";
import { getDataFromFS } from "../services/firestore";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const docArr = await getDataFromFS();
      const fetchedData = docArr.map((doc) => {
        const item = doc.data();
        return { id: doc.id, ...item };
      });
      setPosts(fetchedData);
    };
    fetchData();
  }, []);

  // const addHandler = async (event) => {
  //   event.preventDefault();
  //   const newPost = { name: name, artist: artist };
  //   setPosts((prev) => {
  //     return [...posts, newPost];
  //   });
  //   setName("");
  //   setArtist("");
  //
  //   const collectionRef = collection(db, "posts");
  //   await addDoc(collectionRef, newPost);
  // };

  return (
    <div>
      <div>
        <h2>posts list</h2>
        {posts.map((p) => (
          <p key={p.id}>{p.title}</p>
        ))}
      </div>
      <form>
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
