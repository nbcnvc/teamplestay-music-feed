import Card from "./ui/Card";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { auth } from "../services/firebase";
import NewPost from "./NewPost";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { storage } from "../services/firebase";

const Profile = () => {
  const posts = useSelector((state) => state.postsApi.posts);
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const imageRef = ref(storage, `music-web`);
    await uploadBytes(imageRef, selectedFile);

    const imageURL = await getDownloadURL(imageRef);
    setDownloadURL(imageURL);
  };

  const handleEdit = () => {
    // Define your handleEdit logic here
  };

  // useEffect(() => {
  //   if (downloadURL !== "") {
  //     const imageContainer = document.querySelector(".image-container");

  //     // 기존의 내용을 지우고 새로운 이미지를 넣습니다.
  //     imageContainer.innerHTML = `<img src="${downloadURL}" />`;
  //   }
  // }, [downloadURL]);

  useEffect(() => {
    if (downloadURL !== "") {
      const imageContainer = document.querySelector(".image-container");

      // 기존의 내용을 지우고 새로운 이미지를 넣습니다.
      imageContainer.innerHTML = `<img src="${downloadURL}" />`;
    }
  }, [downloadURL]);

  return (
    <div>
      <UserInfo>
        <h2>로그인 정보</h2>
        <h3>
          e-mail : {auth.currentUser ? auth.currentUser.email : "No user"}
        </h3>
      </UserInfo>
      <h2>내가 작성한 글 보기</h2>
      <Container>
        {posts
          .filter((post) => {
            const currentUserId = auth.currentUser.uid;
            return post.userId === currentUserId;
          })
          .map((post) => (
            <Card key={post.id} post={post} />
          ))}
      </Container>
      <div>
        <h2>Profile</h2>
        <h3>파일 업로드</h3>
        <input type="file" onChange={handleFileSelect} />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={handleEdit}>수정하기</button>
        <div style={{ width: "300px" }} className="image-container">
          <StImage src={downloadURL} alt="Uploaded Image" />
        </div>
      </div>
    </div>
  );
};

export default Profile;

const UserInfo = styled.div`
  padding: 30px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const StImage = styled.img`
  width: 100%;
  height: auto;
`;

// #root > main > div > div:nth-child(4) > div > img
