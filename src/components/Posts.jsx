import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { postsApiAction } from "../redux/slices/apiSlices/postsApiSlice";
import { getDataFromFS } from "../services/firestore";

import Card from "./ui/Card";
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
    <div>
      <NewPost />
      <Container>
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </Container>
    </div>
  );
}

export default Posts;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;
