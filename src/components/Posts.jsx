import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { postsApiAction } from "../redux/slices/apiSlices/postsApiSlice";
import { getDataFromFS } from "../services/firestore";

import Post from "./Post";
import NewPost from "./NewPost";

function Posts() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postsApi.posts);

  useEffect(() => {
    const fetchData = async () => {
      const docArr = await getDataFromFS();
      const fetchedData = docArr.map((doc) => {
        const item = doc.data();
        return { id: doc.id, ...item };
      });
      dispatch(postsApiAction.actionUpdateAllPosts(fetchedData));
    };
    fetchData();
  }, []);

  return (
    <>
      <iframe
        style={{
          // position: "fixed",
          // zIndex: "-99",
          width: "100%",
          height: "650px",
          // backgroundSize: "cover",
          marginTop: "0",
          marginBottom: "auto",
          opacity: "0.5",
          pointerEvents: "none",
          marginBottom: "50px",
        }}
        frameborder="0"
        src="https://www.youtube.com/embed/6ZUIwj3FgUY?mute=1&loop=1&autoplay=1&rel=0&controls=0&showinfo=0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <NewPost />
      <Container>
        {/* {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))} */}
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
