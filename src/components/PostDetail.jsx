import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import Button from "./ui/Button";

import { postsApiAction } from "../redux/slices/apiSlices/postsApiSlice";

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
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    dispatch(postsApiAction.actionEditPost(editedPost));
  };

  return (
    <Container>
      <h1>⭐오늘의 pick⭐</h1>
      {isEditing ? (
        <StForm>
          <StBox>
            <label>
              Title:
              <StInput
                type="text"
                value={editedPost.title}
                onChange={handleTitleChange}
              />
            </label>
            <br />
            <label>
              Artist:
              <StInput
                type="text"
                value={editedPost.artist}
                onChange={handleArtistChange}
              />
            </label>
            <br />
            <label>
              Review:
              <StInput
                value={editedPost.review}
                onChange={handleReviewChange}
              ></StInput>
            </label>
            <br />
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </StBox>
        </StForm>
      ) : (
        <>
          <StContainer>
            <StBox>
              <p>Title: {editedPost.title}</p>
              <p>Artist: {editedPost.artist}</p>
              <p>Review: {editedPost.review}</p>
              <Button type="button" onClick={handleEdit}>
                수정하기
              </Button>
            </StBox>
          </StContainer>
        </>
      )}
    </Container>
  );
};

export default PostDetail;

const Container = styled.nav`
  display: grid;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const StBox = styled.div`
  border: 1px solid white;
  padding: 40px;
  margin-top: 20px;
  border-radius: 10px;

  /* align-items: center;
  justify-content: center; */
  width: 250px;
`;

const StContainer = styled.div`
  /* padding-top: 50ps; */
`;

const StInput = styled.input`
  padding: 10px;
  margin: 10px;
`;

const StForm = styled.form`
  display: grid;
  place-content: left;
`;
