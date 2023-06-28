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

  const Profile = () => {
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

    useEffect(() => {
      if (downloadURL !== "") {
        // 이미지가 업로드된 후에 실행되도록 useEffect를 사용합니다.
        // downloadURL 값이 변경될 때마다 이미지를 업데이트합니다.
        const img = new Image();
        img.src = downloadURL;
        document.body.appendChild(img);
        const imageContainer = document.querySelector(".image-container");
        // 기존의 내용을 지우고 새로운 이미지를 넣습니다.
        imageContainer.innerHTML = "";
        imageContainer.appendChild(img);
      }
    }, [downloadURL]);
  };

  return (
    <div>
      <UserInfo>
        <h2>로그인 정보</h2>
        <h3>e-mail : {auth.currentUser.email}</h3>
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
        <div className="image-container"></div>
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
