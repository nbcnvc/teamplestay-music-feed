import Card from "./ui/Card";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { auth } from "../services/firebase";
import NewPost from "./NewPost";

const Profile = () => {
  const posts = useSelector((state) => state.postsApi.posts);

  return (
    <div>
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
    </div>
  );
};

export default Profile;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;
