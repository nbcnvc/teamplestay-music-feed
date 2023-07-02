import styled from "styled-components";

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  gap: 20px;
  margin: 0 auto;
  max-width: 1200px;
`;

const PostBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const StPost = styled.div`
  width: 250px;
  height: 300px;
  border: 4px solid white;
  padding: 30px 40px 40px 40px;
  border-radius: 20px;
  cursor: pointer;
`;

const ReviewBox = styled.div`
  height: 110px;
`;

export { PostContainer, PostBox, StPost, ReviewBox };
