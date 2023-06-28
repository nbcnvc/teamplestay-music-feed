<<<<<<< HEAD
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
=======
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postsApiAction } from "../redux/slices/apiSlices/postsApiSlice";
import { getDataFromFS } from "../services/firestore";

function Posts() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postsApi.posts);
>>>>>>> d98faaf4d011d7dd32144cb2a68bc8f7904df7e6

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);

      const initialPosts = [];

      querySnapshot.forEach((doc) => {
        initialPosts.push({ id: doc.id, ...doc.data() });
      });
<<<<<<< HEAD
      setPosts(initialPosts);
=======
      console.log('fetched=', fetchedData)
      dispatch(postsApiAction.actionUpdateAllPosts(fetchedData));
>>>>>>> d98faaf4d011d7dd32144cb2a68bc8f7904df7e6
    };
    fetchData();
  }, []);

<<<<<<< HEAD
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
=======
  return (
    <div>
      <h2>posts list</h2>
      {posts.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
>>>>>>> d98faaf4d011d7dd32144cb2a68bc8f7904df7e6
    </div>
  );
}

export default Posts;
