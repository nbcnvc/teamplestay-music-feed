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
        path: "posts/",
        element: <Posts />,
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
    ],
  },
]);

export default router;
