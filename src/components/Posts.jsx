import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
} from "firebase/firestore";
import { db } from "../services/firebase";

function Posts() {
  const [posts, setPosts] = useState([]);

  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);

      const initialPosts = [];

      querySnapshot.forEach((doc) => {
        initialPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(initialPosts);
    };
    fetchData();
  }, []);

  const addPost = async (event) => {
    event.preventDefault();
    const newPost = { name: name, artist: artist };

    const collectionRef = collection(db, "posts");
    const { id } = await addDoc(collectionRef, newPost);

    setPosts((prev) => {
      return [...posts, { ...newPost, id }];
    });
    setName("");
    setArtist("");
  };

  // const deletePost = async () => {
  //   const postRef = doc(db, "posts", posts.id);
  //   await deleteDoc(postRef);

  //   setPosts((prev) => {
  //     return prev.filter((post) => post.id !== posts.id);
  //   });
  // };

  return (
    <div>
      <form onSubmit={addPost}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="이름"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          name="artist"
          value={artist}
          placeholder="가수"
          onChange={(e) => {
            setArtist(e.target.value);
          }}
        />
        <button>등록하기</button>
      </form>

      <div>
        <h2>Posts</h2>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <p>{post.name}</p>
              <p>{post.artist}</p>
              <button
                onClick={() => {
                  const newPosts = posts.filter((item) => {
                    return item.id !== post.id;
                  });
                  setPosts(newPosts);
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
