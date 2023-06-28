import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Signin from "./components/Signin";
import Posts from "./components/Posts";
import Post from "./components/Post";
import PostDetail from "./components/PostDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Posts />,
      },
      {
        path: "posts/:id",
        element: <PostDetail />,
      },
      {
        path: "auth/profile/",
        element: <Profile />,
      },
      {
        path: "auth/signup/",
        element: <Signup />,
      },
      {
        path: "auth/signin/",
        element: <Signin />,
      },
      {
        path: "posts/:id",
        element: <Post />,
      },
    ],
  },
]);

export default router;
