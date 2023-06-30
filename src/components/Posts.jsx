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
        return { id: doc.id, ...item };
      });
      dispatch(postsApiAction.actionUpdateAllPosts(fetchedData));
    };
    fetchData();
  }, []);

  // const goToDetailHandler = () => {
  //   navigate(`posts/${post.id}`, {
  //     state: {
  //       post: post,
  //     },
  //   });
  // }

  return (
    <>
      <NewPost />
      <Container>
        {/* {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))} */}

        {posts.map((post) => {
          return (
            <StPost post={post} key={post.id}>
              <Link to={`posts/${post.id}`} state={{post: post}}>
                <p>🤍 {post.like}</p> {/* 좋아요 값 */}
                <br />
                <p>{post.title}</p>
                <p>{post.artist}</p>
                <p>{post.review}</p>
                <br />
                <button
                  onClick={() => {
                    const newPosts = posts.filter((item) => {
                      return item.id !== post.id;
                    });
                    // setPosts(newPosts);
                  }}
                >
                  삭제
                </button>
                <button
                  onClick={() => {
                    // incrementLike(post.id);
                  }}
                >
                  좋아요
                </button>
              </Link>
            </StPost>
          );
        })}
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
