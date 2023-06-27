import { useState } from "react";
// import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../services/firebase";

function Posts() {
  //   const [name, setName] = useState("");
  //   const [artist, setArtist] = useState("");
  //   const [title, setTitle] = useState("");
  //   const [contents, setContents] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const name = data.name;
        const title = data.title;
        console.log(`${doc.id} => ${(name, title)}`);
      });
    };
    fetchData();
  }, []);

  //   const [posts, setPosts] = useState([
  //     { text: "할일 1", isDone: false, id: 1 },
  //     { text: "할일 2", isDone: false, id: 2 },
  //   ]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const q = query(collection(db, "posts"));
  //       const querySnapshot = await getDocs(q);

  //       const initialPosts = [];

  //       querySnapshot.forEach((doc) => {
  //         const data = {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //         console.log(data);
  //         initialPosts.push(data);
  //       });

  //       setPosts(initialPosts);
  //     };
  //   });

  return (
    <div>
      {/* <form
        onSubmit={(post) => {
          alert(1);
        }}
      >
        <input
          type="test"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="test"
          name="artist"
          onChange={(e) => {
            setArtist(e.target.value);
          }}
        />
        <input
          type="test"
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="test"
          name="contents"
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
        <button>등록하기</button>
      </form> */}
    </div>
  );
}

export default Posts;
