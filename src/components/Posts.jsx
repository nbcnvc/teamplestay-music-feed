import { useState, useEffect } from "react";
import { createData, getDataFromFS, updateData } from "../services/firestore";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [review, setReview] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docArr = await getDataFromFS();
      const fetchedData = docArr.map((doc) => {
        const item = doc.data();
        return { id: doc.id, ...item };
      });
      setPosts(fetchedData);
    };
    fetchData();
    //ㅇ
  }, []);

  const addHandler = async (event) => {
    event.preventDefault();
    const newPost = { title: title, artist: artist, review: review };
    setPosts((prev) => {
      return [...prev, newPost];
    });
    setTitle("");
    setArtist("");
    setReview("");

    createData(newPost);
  };

  const editHandler = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    if (postToEdit) {
      setTitle(postToEdit.title);
      setArtist(postToEdit.artist);
      setReview(postToEdit.review);
      setEditingId(postId);
    }
  };

  const updateHandler = async (event) => {
    event.preventDefault();
    const updatedPost = { title: title, artist: artist, review: review };

    setPosts((prev) => {
      const updatedPosts = prev.map((post) => {
        if (post.id === editingId) {
          return { ...post, ...updatedPost };
        }
        return post;
      });
      return updatedPosts;
    });

    updateData(editingId, updatedPost);

    setTitle("");
    setArtist("");
    setReview("");
    setEditingId(null);
  };

  return (
    <div>
      <div>
        <h2>Posts List</h2>
        {posts.map((p) => (
          <div key={p.id} style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "10px" }}>
              {p.title}, {p.artist}, {p.review}
            </p>
            <button onClick={() => editHandler(p.id)}>수정</button>
          </div>
        ))}
      </div>
      <form onSubmit={editingId ? updateHandler : addHandler}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          name="artist"
          value={artist}
          onChange={(e) => {
            setArtist(e.target.value);
          }}
        />
        <input
          type="text"
          name="review"
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button type="submit">{editingId ? "수정하기" : "등록하기"}</button>
      </form>
    </div>
  );
}

export default Posts;
