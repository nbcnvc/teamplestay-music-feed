import { useState, useEffect } from "react";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../services/firebase";
import styled from "styled-components";
import { auth } from "../services/firebase";
import Card from "./ui/Card";
import { Link } from "react-router-dom";

import Button from "./ui/Button";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);
      const initialPosts = [];
      querySnapshot.forEach((doc) => {
        initialPosts.push({ id: doc.id, ...doc.data(), like: 0 }); // 좋아요 값을 0으로 초기화한 post 객체 추가
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
      return [...posts, { ...newPost, id, like: 0 }]; // 좋아요 값을 0으로 초기화한 post 객체 추가
    });
    setTitle("");
    setArtist("");
    setReview("");
  };
  const incrementLike = (postId) => {
    setPosts((prev) => {
      return prev.map((post) => {
        if (post.id === postId) {
          return { ...post, like: post.like + 1 }; // 클릭한 포스트의 좋아요 값 증가
        }
        return post;
      });
    });
  };
  return (
    <div>
      <StForm onSubmit={addPost}>
        <StInput
          type="text"
          name="title"
          value={title}
          placeholder="제목"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <StInput
          type="text"
          name="artist"
          value={artist}
          placeholder="가수"
          onChange={(e) => {
            setArtist(e.target.value);
          }}
        />
        <StInput
          type="text"
          name="review"
          value={review}
          placeholder="가수"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <Button>등록하기</Button>
      </StForm>
      <Container>
        {posts.map((post) => {
          return (
            <StPost post={post} key={post.id}>
              <p>🤍 {post.like}</p> {/* 좋아요 값 */}
              <br />
              <p
                style={{
                  marginBottom: "20px",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                {post.title} - {post.artist}
              </p>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                {post.review}
              </p>
              <br />
              <StButtonLayout>
                <Button
                  onClick={() => {
                    const newPosts = posts.filter((item) => {
                      return item.id !== post.id;
                    });
                    setPosts(newPosts);
                  }}
                >
                  삭제
                </Button>
                <Button
                  onClick={() => {
                    incrementLike(post.id);
                  }}
                >
                  좋아요
                </Button>
              </StButtonLayout>
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
  flex-wrap: wrap;
  gap: 20px;
`;
const StForm = styled.div`
  margin: 20px auto;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  /* position: fixed; */
  width: 100%;
  max-width: 1200px;
  min-width: 800px;
`;

const StPost = styled.div`
  width: 300px;
  border: 1px solid white;
  padding: 20px;
  cursor: pointer;
`;

const StButtonLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const StInput = styled.input`
  color: white;
  margin: 20px 5px;
  height: 30px;
  border: 1px solid white;
  background-color: transparent;
  width: 220px;

  .placeholder {
    color: white;
    background-color: orange;
  }
`;
