import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Button from "./ui/Button";

import { postsApiAction } from "../redux/slices/apiSlices/postsApiSlice";
import { deleteData, getDataFromFS } from "../services/firestore";

import NewPost from "./NewPost";

function Posts() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postsApi.posts);

  useEffect(() => {
    const fetchData = async () => {
      const docArr = await getDataFromFS();
      const fetchedData = docArr.map((doc) => {
        const item = doc.data();
        return { id: doc.id, ...item, like: item.like || 0 };
      });
      dispatch(postsApiAction.actionUpdateAllPosts(fetchedData));
    };
    fetchData();
  }, []);

  const incrementLike = (postId) => {
    dispatch(postsApiAction.actionIncrementLike({ postId }));
  };

  const deletePost = (postId) => {
    deleteData(postId);
    dispatch(postsApiAction.actionDeletePost(postId));
  };

  return (
    <>
      <iframe
        style={{
          width: "100%",
          height: "650px",
          marginTop: "0",
          marginBottom: "auto",
          pointerEvents: "none",
          marginBottom: "50px",
        }}
        frameborder="0"
        src="https://www.youtube.com/embed/ewxYV67Gtn4?mute=1&loop=1&autoplay=1&rel=0&controls=0&showinfo=0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <Container>
        <NewPost />
        <PostContainer>
          {posts.map((post) => (
            <StPost key={post.id}>
              <p>🤍 {post.like}</p>
              <br />
              <Link to={`posts/${post.id}`} state={{ post: post }}>
                <p style={{ color: "white" }}>{post.title}</p>
                <p style={{ color: "white" }}>{post.artist}</p>
                <p style={{ color: "white" }}>{post.review}</p>
              </Link>
              <br />
              <StButtonLayout>
                <Button onClick={() => deletePost(post.id)}>삭제</Button>
                <Button onClick={() => incrementLike(post.id)}>좋아요</Button>
              </StButtonLayout>
            </StPost>
          ))}
        </PostContainer>
      </Container>
    </>
  );
}

export default Posts;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StPost = styled.div`
  width: 300px;
  border: 1px solid white;
  padding: 20px;
  cursor: pointer;
  flex-wrap: wrap;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  margin: 0 auto;
  max-width: 1200px;
`;

const StButtonLayout = styled.div`
  display: flex;
  justify-content: center;
`;
