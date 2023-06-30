import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { postsApiAction } from "../redux/slices/apiSlices/postsApiSlice";
import { getDataFromFS } from "../services/firestore";

import Post from "./Post";
import NewPost from "./NewPost";

function Posts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    // 삭제 로직 구현
    const newPosts = posts.filter((post) => post.id !== postId);
    dispatch(postsApiAction.actionUpdateAllPosts(newPosts));
  };

  return (
    <>
      <NewPost />
      <Container>
        {posts.map((post) => (
          <StPost key={post.id}>
            <p>🤍 {post.like}</p>
            <br />
            <Link to={`posts/${post.id}`} state={{ post: post }}>
              <p>{post.title}</p>
              <p>{post.artist}</p>
              <p>{post.review}</p>
            </Link>
            <br />
            <button onClick={() => deletePost(post.id)}>삭제</button>
            <button onClick={() => incrementLike(post.id)}>좋아요</button>
          </StPost>
        ))}
      </Container>
    </>
  );
}

export default Posts;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const StPost = styled.div`
  width: 300px;
  border: 1px solid white;
  padding: 20px;
  cursor: pointer;
`;
