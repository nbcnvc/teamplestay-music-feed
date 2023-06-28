import { useState, useEffect } from "react";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../services/firebase";
import styled from "styled-components";
import { auth } from "../services/firebase";

function Posts() {
  const [posts, setPosts] = useState([]);

  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

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
    const newPost = { userId: auth.currentUser.uid, title, artist, review };

    const collectionRef = collection(db, "posts");
    const { id } = await addDoc(collectionRef, newPost);

    if (!title || !artist || !review) {
      alert("필수 값이 누락되었습니다.");
      return false;
    }

    setPosts((prev) => {
      return [...posts, { ...newPost, id }];
    });
    setTitle("");
    setArtist("");
    setReview("");
  };

  return (
    <div>
      <StForm onSubmit={addPost}>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="제목"
          onChange={(e) => {
            setTitle(e.target.value);
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
        <input
          type="text"
          name="review"
          value={review}
          placeholder="가수"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button>등록하기</button>
      </StForm>

      <h2>Posts</h2>
      <Container>
        {posts.map((post) => {
          return (
            <StPost key={post.id}>
              <p>{post.title}</p>
              <p>{post.artist}</p>
              <p>{post.review}</p>
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
            </StPost>
          );
        })}
      </Container>
    </div>
  );
}

export default Posts;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const StPost = styled.div`
  width: 300px;
  border: 1px solid white;
  padding: 10px;
`;

const StForm = styled.form`
  background-color: orange;
  margin: 10px;
  padding: 10px;
  display: flex;
`;
