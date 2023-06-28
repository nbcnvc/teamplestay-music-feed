import { useState } from "react";
import styled from "styled-components";

const Card = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  return (
    <Container onMouseOver={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
      <Overlay isHovered={isHovered} />
      <h3>{post.reviewer}</h3>
      <p>Title: {post.title}</p>
      <p>Artist: {post.artist}</p>
      <p>Review: {post.review}</p>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  width: 250px;
  height: 350px;
  padding: 15px;
  box-sizing: border-box;
  background: #c4c4c4;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Overlay = styled.div`
  width: 250px;
  height: 350px;
  padding: 15px;
  box-sizing: border-box;

  position: absolute;
  top: 0;
  left: 0;

  background: rgba(255, 255, 255, 0.5);
  opacity: ${(props) => (props.isHovered ? 1 : 0)};
`;
