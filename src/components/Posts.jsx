import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { postsApiAction } from "../redux/slices/apiSlices/postsApiSlice";
import { deleteData, getDataFromFS, updateLike } from "../services/firestore";

import NewPost from "./NewPost";
import Button from "./ui/Button";
import { PostBox, PostContainer, ReviewBox, StPost } from "./ui/Post";
import { BigText, HeaderText, SmallText, Text } from "./ui/Text";

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
  }, [dispatch]);

  const incrementLike = async (postId) => {
    updateLike(postId);
    dispatch(postsApiAction.actionIncrementLike(postId));
  };

  const deletePost = (postId) => {
    deleteData(postId);
    dispatch(postsApiAction.actionDeletePost(postId));
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div style={{ position: "relative", zIndex: "1" }}>
          <HeaderText style={{ marginTop: "60px" }}>Music</HeaderText>
          <HeaderText style={{ marginBottom: "350px" }}>Pick</HeaderText>
          <HeaderText></HeaderText>
        </div>
        <div
          style={{
            position: "absolute",
            top: "-12%",
            left: 0,
            width: "100%",
          }}
        >
          <iframe
            style={{
              width: "100%",
              height: "600px",
              opacity: "0.5",
              pointerEvents: "none",
              marginBottom: "50px",
              zIndex: "2",
              // flex: "grid",
            }}
            frameborder="0"
            src="https://www.youtube.com/embed/ewxYV67Gtn4?mute=1&loop=1&autoplay=1&rel=0&controls=0&showinfo=0"
            title="뮤직비디오 영상 "
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <h2
        style={{
          color: "white",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        여러분의 추천 음악을 알려주세요 ! ♫
      </h2>
      <NewPost />
      <PostContainer style={{ marginBottom: "100px" }}>
        <PostBox>
          {posts.map((post) => (
            <StPost key={post.id}>
              <p>🤍 {post.like}</p>
              <br />
              <Link to={`posts/${post.id}`} state={{ post: post }}>
                <Text
                  style={{
                    paddingTop: "5px",
                  }}
                >
                  {post.title}
                </Text>
                <BigText
                  style={{
                    paddingBottom: "25px",
                    borderBottom: "1px solid white",
                  }}
                >
                  {post.artist}
                </BigText>
                <ReviewBox>
                  <SmallText
                    style={{
                      paddingTop: "30px",
                    }}
                  >
                    {post.review}
                  </SmallText>
                </ReviewBox>
              </Link>
              <br />
              <div>
                <Button
                  style={{ marginRight: "10px" }}
                  onClick={() => deletePost(post.id)}
                >
                  삭제
                </Button>
                <Button onClick={() => incrementLike(post.id)}>좋아요</Button>
              </div>
            </StPost>
          ))}
        </PostBox>
      </PostContainer>
    </>
  );
}

export default Posts;
