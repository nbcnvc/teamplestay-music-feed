import Card from "./ui/Card";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { auth } from "../services/firebase";
import NewPost from "./NewPost";

const Profile = () => {
  const posts = useSelector((state) => state.postsApi.posts);

  return (
    <div>
      <UserInfo>
        <h2>로그인 정보</h2>
        <h3>e-mail : {auth.currentUser.email}</h3>
      </UserInfo>
      <h2>내가 작성한 글 보기</h2>
      <Container>
        {
          posts
            .filter((post) => {
              const currentUserId = auth.currentUser.uid;
              return post.userId === currentUserId;
            })
            .map((post) => {
              return (
                <div key={post.id}>
                  <p>{post.title}</p>
                  <p>{post.artist}</p>
                  <p>{post.review}</p>
                </div>
              );
            })
          // .map((post) => (
          //   <Card key={post.id} post={post} />
          // ))
        }
      </Container>
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
