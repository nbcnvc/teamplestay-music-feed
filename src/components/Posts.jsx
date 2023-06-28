import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postsApiAction } from "../redux/slices/apiSlices/postsApiSlice";
import { getDataFromFS } from "../services/firestore";

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
      <h2>posts list</h2>
      {posts.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
}

export default Posts;
