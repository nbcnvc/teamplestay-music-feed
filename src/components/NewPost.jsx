import { useState, useEffect } from "react";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../services/firebase";
import styled from "styled-components";
import { auth } from "../services/firebase";

import Button from "./ui/Button";
import { useDispatch } from "react-redux";
import { postsApiAction } from "../redux/slices/apiSlices/postsApiSlice";
import { createData } from "../services/firestore";

function Posts() {
  const dispatch = useDispatch();

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

    const newPost = {
      userId: auth.currentUser.uid,
      title,
      artist,
      review,
      like: 0,
    };
    const docRef = await createData(newPost);
    newPost.id = docRef.id;

    if (!title || !artist || !review) {
      alert("필수 값이 누락되었습니다.");
      return false;
    }

    // 업데이트된 데이터를 현재 상태의 posts에 추가하여 업데이트
    dispatch(postsApiAction.actionAddPost(newPost));

    setTitle("");
    setArtist("");
    setReview("");
    alert("등록되었습니다");
  };

  return (
    <div>
      <StForm onSubmit={addPost}>
        <StInput
          type="text"
          name="title"
          value={title}
          placeholder="  Artist"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <StInput
          type="text"
          name="artist"
          value={artist}
          placeholder="  Title"
          onChange={(e) => {
            setArtist(e.target.value);
          }}
        />
        <StInput
          type="text"
          name="review"
          value={review}
          placeholder="  Review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <Button>등록하기</Button>
      </StForm>
    </div>
  );
}

export default Posts;

const StForm = styled.form`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  /* position: fixed; */
  width: 100%;
  max-width: 1040px;
  min-width: 800px;
  /* border-radius: 10px; */
  /* background-color: white; */
  margin: 20px auto 80px auto;
  /* opacity: 0.5;  */
`;

const StInput = styled.input`
  color: black;
  width: 300px;
  height: 30px;
  border: 1px solid white;
  border-radius: 8px;
  /* background-color: transparent; */
  margin: 10px 10px 10px 0px;

  .placeholder {
    color: white;
    background-color: orange;
  }
`;
