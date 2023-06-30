import { useState, useEffect } from "react";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../services/firebase";
import styled from "styled-components";
import { auth } from "../services/firebase";
import Card from "./ui/Card";

import Button from "./ui/Button";
import { findAllInRenderedTree } from "react-dom/test-utils";

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

    // 현재 사용자가 로그인되어 있는지 확인
    if (!auth.currentUser) {
      // 로그인되어 있지 않은 경우, 필요한 처리를 여기에 추가
      return;
    }

    const newPost = { userId: auth.currentUser.uid, title, artist, review };

    const collectionRef = collection(db, "posts");
    const { id } = await addDoc(collectionRef, newPost);

    if (!title || !artist || !review) {
      alert("필수 값이 누락되었습니다.");
      return false;
    }

    const updatedPost = { ...newPost, id, like: 0 }; // 좋아요 값을 0으로 초기화한 post 객체

    // 업데이트된 데이터를 현재 상태의 posts에 추가하여 업데이트
    setPosts((prev) => [...prev, updatedPost]);

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
          placeholder="가수"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <StInput
          type="text"
          name="artist"
          value={artist}
          placeholder="제목"
          onChange={(e) => {
            setArtist(e.target.value);
          }}
        />
        <StInput
          type="text"
          name="review"
          value={review}
          placeholder="리뷰"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <Button onClick={() => alert("등록되었습니다")}>등록하기</Button>
      </StForm>
    </div>
  );
}

export default Posts;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const StForm = styled.form`
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
