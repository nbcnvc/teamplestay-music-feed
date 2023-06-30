import Card from "./ui/Card";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { auth } from "../services/firebase";
import NewPost from "./NewPost";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { storage } from "../services/firebase";
import Button from "./ui/Button";

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

  // Edit 버튼 클릭 시, Modal 창 열림
  const handleEdit = () => {
    setModalOpen(true);
  };

  // Modal - Upload 버튼 클릭 시, 이미지 업로드
  // uploadBytes() --> 이미지 업로드
  const handleUpload = async () => {
    const imageRef = ref(storage, `music-web`);
    if (selectedFile) {
      await uploadBytes(imageRef, selectedFile);
      // 이미지 URL 추출
      const imageURL = await getDownloadURL(imageRef);
      setDownloadURL(imageURL);
    }
    // 이미지를 업로드하기 전에 선택된 이미지를 미리보기로 보여줌
    const imagePreview = document.querySelector(".preview-image");
    if (imagePreview) {
      imagePreview.src = URL.createObjectURL(selectedFile);
    }

    alert("업로드되었습니다!");
  };

  // uploadBytes() --> 이미지 업로드
  // const handleUpload = async () => {
  // ref(storage, `본인 폴더명`)
  // const imageRef = ref(storage, `music-web`);
  // await uploadBytes(imageRef, selectedFile);
  // 이미지 URL 추출
  //   const imageURL = await getDownloadURL(imageRef);
  //   setDownloadURL(imageURL);
  // };

  // 이미지 화면에 렌더링
  // useEffect(() => {
  //   if (downloadURL !== "") {
  //     const imageContainer = document.querySelector(".image-container");
  //     const imgBox = document.createElement("div"); // 이미지 박스 요소 생성
  //     const img = document.createElement("img"); // 이미지 요소 생성

  // 이미지 화면에 렌더링
  useEffect(() => {
    const imageContainer = document.querySelector(".image-container");
    imageContainer.innerHTML = ""; // 기존의 내용을 지우고
    if (downloadURL !== "") {
      const imgBox = document.createElement("div"); // 이미지 박스 요소 생성
      const img = document.createElement("img"); // 이미지 요소 생성

      img.src = downloadURL;
      imgBox.appendChild(img);
      // imageContainer.innerHTML = "";

      // 이미지 박스에 스타일 적용
      imgBox.style.maxWidth = "250px";
      imgBox.style.maxHeight = "250px";
      imgBox.style.borderRadius = "50%";
      imgBox.style.margin = "50px 0px 50px 0px";
      imgBox.style.overflow = "hidden"; // 이미지가 박스를 벗어나지 않도록 설정

      // 이미지에 스타일 적용하여 꽉 차게 설정
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      imageContainer.appendChild(imgBox);
    } else {
      // 기본 이미지 설정
      const defaultImg = document.createElement("img");
      defaultImg.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADdCAMAAACc/C7aAAAAM1BMVEX////Hx8fk5OTExMTFxcXGxsbCwsLDw8P09PTU1NTBwcHi4uLX19fR0dHb29vz8/Ps7OwLEaHdAAAE4klEQVR4nO2d3XLrKgyFMWCwHf+9/9MeBHZil+6ZkwyuyZJ0pX7Ti6yaCrFMQKkQnWkaqynr26ZxaKhRNXyKvxHprPWJGWsHNGTVGkI/QmjKKHnAIWWM8RNp1s6YoaNsQEMqDNm2j8w2jYnMoSEeIl/DdcgfOAhSS4i1H8dRUzaHpEdDYxTaubbdKq5t2wENtUlkfRO4dDyfiRy8HyKbKENDXoWux6SK6611qT6hofM86fOZBgHxaAZChbWJmVB20wNHQ2oKMXchNGUrZXAoCj0UI5fXp69HPomsb26TZuDDZiA3EICQVZpBHDoeF/4MP3oGEMSjGWAh0hjjcgMBC5H90a1T3/e6C9kckqkDQ/G5RrfA5AYCChL7AwVl9kctTXXZBt05N2zFKGSpPqEhHvMkC5En+8PlBgICUjRZzjRtaspW6g3Q0BKFdtQApWLkQ4aGTBJZ39wmzcDH9ofbnu7BQEBBVsV9EjGeGRw6v/D5aSCAIB7NAAuRoUnf3YLQuacHjoYUvRBZ6dWIpmymDA4loT43EIAQJ/vD578GhHaR1Q2xssM1VNchr09YiMc8yUJkGLJ7q3cwELCQoq2SM3kEmrLoFsChKJTcgn35dTAQUJDYHyhotz+qG2Jlh2s9X1G5DjHc71rRBC4dj9gf/7A/lugWhFSN0S2AQ1Hoafnl0BAz+2MXfjAQUFASuZDcxEJi0VDDo7qymCdZiGTRu84UsWnfkxUORaF3L/jE/hD74x2R9Q2xssOV/jsf+b8uFOIxhbBoBliIZNGgUyzNNKWVyUgZGhL7AwX9tjGiir9++Se5NLtbMDabcCzEorqymCdZiGTRu1axTLh6FUJx94JP7A+xP94RWd8QE/tD7A+xPyr7YGJ/fGR/1Pd2uOybZoq7X+r/yZ6Bu2drsT9K2B90QN95A1OjwNDEo7qymCdZiGTRu1axSfzqPegUdy/4xP4Q++MdkfUNsbLDtYqvxV39rTsW359k0QywEMmiQae4e8H3NxsjXm7Bc6YBQpyagfqOsih7LEYVB+ZcfR4Pi+rKYp5kIZLFuXX/7wy/70ZR6N2HPV6MbBJZ3wQu9sfH9kdlp+uWROZ55vKSn1qMgpbD6dlHAwEL8WgGWIhkcTcBxd3XQFyM5Bo4FLSJrO/enZJotz/6fnML4n1GYKjnca8Wi3mShUgWtxZqBhGFvtyC012cKEjsDxTE5Bo4ahK2C6pDlu6sRkM87k5n0QycRPr81xAQNeg+9bPu0OJioRiHYjTk9enrkdgfKOhlf/jcQEBBLV1Gvaz9OPaasnkMGRoaD9V1yOsTCGLYDFT0wUrbH/vceTAQsFCyP05bJx5wKAolt8DnBgIKEvsDBTGxP2g/6OYWhCC3AA79an84NMSjGXiJNLmBAIJ+PMl4Y5pHQzHuLn+y+0OagXdEvtwCkxsIX49aFU/KGud51Mu6LjNlCxiaeZjLzJqBuj5YUZEshuvzrL50cMZ+ah8UikI7lxsIQEjsDxTEyP4Y6UdNlxbElUmDhsT+QEEkchd+MBCwEIlstiEcIg7hFg3FuLv8if0hzcA7IuvrN8v2rtH+yPt4KMRjPcmlGbj/U4j9Ucj+uL0yXF14KO6u8WJ/SMfzjsj6muqyDfovSy04JPYHCuLxJFlYkhR3lz+xP6QZEJFPkf8BszIWYCtGNVAAAAAASUVORK5CYII=";
      // 이미지에 스타일 적용하여 꽉 차게 설정
      defaultImg.style.width = "250px";
      defaultImg.style.height = "250px";
      defaultImg.style.borderRadius = "50%";
      defaultImg.style.objectFit = "cover";
      defaultImg.style.overflow = "hidden";
      imageContainer.appendChild(defaultImg);
    }
    // const fileButton = document.createElement("button");
    // fileButton.style.height = "35px";
    // // width: 250px;
    // // height: 35px;
    // // border-width: 0px;
    // // border-radius: 8px;
    // // margin-top: 10px;
  }, [downloadURL]);

  // 이미지에 스타일 적용하여 꽉 차게 설정
  //     img.style.width = "100%";
  //     img.style.height = "100%";
  //     img.style.objectFit = "cover";

  //     imageContainer.appendChild(imgBox);
  //   }
  // }, [downloadURL]);

  // Edit 버튼 클릭 시, Modal 창 열림
  // const handleEdit = () => {
  //   setModalOpen(true);
  // };

  // Modal - Edit 버튼 클릭 시, 이미지 재업로드
  // const handleImageEdit = () => {
  //   if (selectedFile) {
  //     handleUpload();
  //   }
  // };

  //   return (
  //     <Container>
  //       <div>
  //         <h1>마이페이지</h1>
  //         {/* ------ Change Image ------  */}
  //         <div className="image-container"></div>
  //         <input type="file" onChange={handleFileSelect} />
  //         <button onClick={handleUpload}>Upload</button>
  //         <button onClick={handleEdit}>Edit</button>

  //         {/* ------ Modal ------  */}
  //         <div>
  //           {modalOpen && (
  //             <Modal>
  //               <input type="file" onChange={handleFileSelect} />
  //               <button onClick={handleImageEdit}>Image Edit</button>
  //               <button onClick={() => setModalOpen(false)}>close</button>
  //             </Modal>
  //           )}
  //         </div>
  //       </div>

  //       {/* ------ User Info ------  */}
  //       <UserInfo>
  //         <h2>로그인 정보</h2>
  //         <h3>e-mail : {auth.currentUser.email}</h3>
  //       </UserInfo>
  //       <h2>내가 작성한 글 보기</h2>

  //       {/* ----- My Post List ------  */}
  //       <PostContainer>
  //         {
  //           posts
  //             .filter((post) => {
  //               const currentUserId = auth.currentUser.uid;
  //               return post.userId === currentUserId;
  //             })
  //             .map((post) => {
  //               return (
  //                 <Card post={post} key={post.id}>
  //                   <p>{post.title}</p>
  //                   <p>{post.artist}</p>
  //                   <p>{post.review}</p>
  //                 </Card>
  //               );
  //             })
  //           // .map((post) => (
  //           //   <Card key={post.id} post={post} />
  //           // ))
  //         }
  //       </PostContainer>
  //     </Container>
  //   );
  // };

  // export default Profile;

  // // styled-components
  // const Container = styled.div`
  //   align-items: center;
  //   justify-content: center;
  //   padding: 0px 50px;
  // `;

  // const UserInfo = styled.div`
  //   margin: 50px 0px 20px 0px;
  // `;

  // const PostContainer = styled.div`
  //   gap: 30px;
  //   margin-top: 50px;
  // `;

  // const Modal = styled.div`
  //   background: white;
  //   width: 300px;
  //   height: 400px;
  //   border-radius: 10px;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   padding: 20px;
  //   position: fixed;
  // `;

  return (
    <Container>
      <ProfileContainer>
        <StBigText>MY PAGE</StBigText>
        <StText>PROFILE</StText>

        <ProfileBox>
          {/* ------ Change Image ------  */}
          <div className="image-container"></div>
          <UserInfo>
            <p>{auth.currentUser.email}</p>
          </UserInfo>
          <StButton onClick={handleEdit}>Edit</StButton>
          {/* ------ Modal ------  */}
          <div>
            {modalOpen && (
              <Modal>
                <InputBox type="file" onChange={handleFileSelect} />
                <StAlign>
                  <StButton onClick={handleUpload}>Upload</StButton>
                  <StButton onClick={() => setModalOpen(false)}>close</StButton>
                </StAlign>
              </Modal>
            )}
          </div>
        </ProfileBox>
      </ProfileContainer>
      {/* ----- My Post List ------  */}
      <StText style={{ marginBottom: "30px" }}>POST</StText>
      <PostContainer>
        <PostBox>
          {posts
            .filter((post) => {
              const currentUserId = auth.currentUser.uid;
              return post.userId === currentUserId;
            })
            .map((post) => {
              return (
                // <StPost post={post} key={post.id}>
                //   <p>{post.title}</p>
                //   <p>{post.artist}</p>
                //   <p>{post.review}</p>
                // </StPost>
                <StPost post={post} key={post.id}>
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
                </StPost>
              );
            })}
        </PostBox>
      </PostContainer>
    </Container>
  );
};
export default Profile;

// styled-components
const Container = styled.div`
  margin-top: 30px;
`;

const ProfileContainer = styled.div`
  align-items: center;
  justify-content: center;
`;
const ProfileBox = styled.div`
  border: 1px solid white;
  padding: 40px;
  margin-top: 20px;
  margin-bottom: 60px;
  border-radius: 10px;

  align-items: center;
  justify-content: center;
  width: 250px;
`;
const UserInfo = styled.div`
  margin: 50px 0px 20px 0px;
`;
const StAlign = styled.div`
  margin-top: auto;
  margin-bottom: 20px;
`;
const StButton = styled.button`
  width: 250px;
  height: 35px;
  border-width: 0px;
  border-radius: 8px;
  margin-top: 10px;
`;
const Modal = styled.div`
  background: white;
  width: 300px;
  height: 450px;
  border-radius: 10px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  position: fixed;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const PostBox = styled.div`
  display: flex;

  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const StPost = styled.div`
  width: 300px;
  border: 1px solid white;
  padding: 20px;
  cursor: pointer;
`;

const InputBox = styled.input`
  color: grey;
  align-self: flex-start;
  margin-top: 20px;
`;
const StBigText = styled.p`
  font-size: 30px;
  margin-bottom: 20px;
`;
const StText = styled.p`
  font-size: 20px;
`;
