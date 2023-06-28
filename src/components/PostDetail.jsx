import { useLocation } from "react-router-dom";

const PostDetail = () => {
  const location = useLocation();
  const post = location.state?.post;

  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.review}</p>
    </>
  );
};

export default PostDetail;
