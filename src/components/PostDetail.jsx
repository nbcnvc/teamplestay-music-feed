import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

import { postsApiAction } from "../redux/slices/apiSlices/postsApiSlice";
import { PostBox, PostContainer, ReviewBox, StPost } from "./ui/Post";
import { BigText, SmallText, Text } from "./ui/Text";
import Button from "./ui/Button";
import { auth } from "../services/firebase";

const PostDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const post = location.state?.post;

  const [editedPost, setEditedPost] = useState(post);
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (event) => {
    setEditedPost({ ...editedPost, title: event.target.value });
  };

  const handleArtistChange = (event) => {
    setEditedPost({ ...editedPost, artist: event.target.value });
  };

  const handleReviewChange = (event) => {
    setEditedPost({ ...editedPost, review: event.target.value });
  };

  const handleEdit = () => {
    if (auth.currentUser.uid !== editedPost.userId) {
      alert('내가 작성한 게시물만 수정할 수 있습니다.')
      return
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    dispatch(postsApiAction.actionEditPost(editedPost));
  };

  return (
    <Container>
      <BigText>EDIT</BigText>
      <PostContainer style={{ marginTop: "30px" }}>
        {isEditing ? (
          <PostBox>
            <StPost>
              <label>
                <p>Title</p>
                <StInput
                  type="text"
                  value={editedPost.title}
                  onChange={handleTitleChange}
                />
              </label>
              <br />
              <label>
                <p>Artist</p>
                <StInput
                  type="text"
                  value={editedPost.artist}
                  onChange={handleArtistChange}
                />
              </label>
              <br />
              <label>
                <p>Review</p>
                <StTextArea
                  value={editedPost.review}
                  onChange={handleReviewChange}
                ></StTextArea>
              </label>
              <br />
              <Button
                style={{ marginTop: "40px" }}
                type="button"
                onClick={handleSave}
              >
                저장하기
              </Button>
            </StPost>
          </PostBox>
        ) : (
          <>
            <div>
              <StPost>
                <Text
                  style={{
                    paddingTop: "5px",
                  }}
                >
                  {editedPost.title}
                </Text>
                <BigText
                  style={{
                    paddingBottom: "25px",
                    borderBottom: "1px solid white",
                  }}
                >
                  {editedPost.artist}
                </BigText>
                <ReviewBox>
                  <SmallText
                    style={{
                      paddingTop: "30px",
                    }}
                  >
                    {editedPost.review}
                  </SmallText>
                </ReviewBox>
                <Button
                  style={{ marginTop: "50px" }}
                  type="button"
                  onClick={handleEdit}
                >
                  수정하기
                </Button>
              </StPost>
            </div>
          </>
        )}
      </PostContainer>
    </Container>
  );
};

export default PostDetail;

const Container = styled.nav`
  display: grid;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 30px;
`;

const StInput = styled.input`
  width: 210px;
  padding: 10px;
  margin: 10px;
`;

const StTextArea = styled.textarea`
  width: 210px;
  padding: 10px;
  margin: 10px;
`;
