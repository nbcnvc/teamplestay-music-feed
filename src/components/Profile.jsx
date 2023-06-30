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
  const [modalOpen, setModalOpen] = useState(false);

  // 파일 선택(input type="file") 이벤트가 발생했을 때 호출
  // 선택된 파일을 가져와 setSelectedFile로 UI 업데이트
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // uploadBytes() --> 이미지 업로드
  const handleUpload = async () => {
    // ref(storage, `본인 폴더명`)
    const imageRef = ref(storage, `music-web`);
    await uploadBytes(imageRef, selectedFile);
    // 이미지 URL 추출
    const imageURL = await getDownloadURL(imageRef);
    setDownloadURL(imageURL);
  };

  // 이미지 화면에 렌더링
  useEffect(() => {
    if (downloadURL !== "") {
      const imageContainer = document.querySelector(".image-container");
      const imgBox = document.createElement("div"); // 이미지 박스 요소 생성
      const img = document.createElement("img"); // 이미지 요소 생성

      img.src = downloadURL;
      imgBox.appendChild(img);
      imageContainer.innerHTML = ""; // 기존의 내용을 지우고

      // 이미지 박스에 스타일 적용
      imgBox.style.width = "250px";
      imgBox.style.height = "250px";
      imgBox.style.borderRadius = "50%";
      imgBox.style.margin = "50px 0px 50px 0px";
      imgBox.style.overflow = "hidden"; // 이미지가 박스를 벗어나지 않도록 설정

      // 이미지에 스타일 적용하여 꽉 차게 설정
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";

      imageContainer.appendChild(imgBox);
    }
  }, [downloadURL]);

  // Edit 버튼 클릭 시, Modal 창 열림
  const handleEdit = () => {
    setModalOpen(true);
  };

  // Modal - Edit 버튼 클릭 시, 이미지 재업로드
  const handleImageEdit = () => {
    if (selectedFile) {
      handleUpload();
    }
  };

  return (
    <Container>
      <div>
        <h1>마이페이지</h1>
        {/* ------ Change Image ------  */}
        <div className="image-container"></div>
        <input type="file" onChange={handleFileSelect} />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={handleEdit}>Edit</button>

        {/* ------ Modal ------  */}
        <div>
          {modalOpen && (
            <Modal>
              <input type="file" onChange={handleFileSelect} />
              <button onClick={handleImageEdit}>Image Edit</button>
              <button onClick={() => setModalOpen(false)}>close</button>
            </Modal>
          )}
        </div>
      </div>

      {/* ------ User Info ------  */}
      <UserInfo>
        <h2>로그인 정보</h2>
        <h3>e-mail : {auth.currentUser.email}</h3>
      </UserInfo>
      <h2>내가 작성한 글 보기</h2>

      {/* ----- My Post List ------  */}
      <PostContainer>
        {posts
          .filter((post) => {
            const currentUserId = auth.currentUser.uid;
            return post.userId === currentUserId;
          })
          .map((post) => {
            return (
              <Card post={post} key={post.id}>
                <p>{post.title}</p>
                <p>{post.artist}</p>
                <p>{post.review}</p>
              </Card>
            );
          })}
      </PostContainer>
    </Container>
  );
};

export default Profile;

// styled-components
const Container = styled.div`
  padding: 0px 50px;
`;

const UserInfo = styled.div`
  margin: 50px 0px 20px 0px;
`;

const PostContainer = styled.div`
  gap: 30px;
  margin-top: 50px;
`;

const Modal = styled.div`
  background: white;
  width: 300px;
  height: 400px;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  position: fixed;
`;
