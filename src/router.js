import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

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
    ],
  },
]);

export default router;
