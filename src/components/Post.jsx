import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import Card from "./ui/Card";

const Post = ({ post }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`posts/${post.id}`, {
      state: {
        post: post,
      }
    });
  };

  return (
    <Container onClick={clickHandler}>
      <Card post={post} />
    </Container>
  );
};

export default Post;

const Container = styled.div``;
