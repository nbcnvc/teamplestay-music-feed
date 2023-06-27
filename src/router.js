import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Signin from "./components/Signin";
import Posts from "./components/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
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
        path: "auth/posts/",
        element: <Posts />,
      },
    ],
  },
]);

export default router;
