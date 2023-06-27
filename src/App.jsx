<<<<<<< Updated upstream
import { RouterProvider } from "react-router-dom";

import router from "./router";

function App() {
  return <RouterProvider router={router} />;
=======
import Signup from "./components/Signup";
import Posts from "./components/Posts";

function App() {
  return (
    <>
      <h2>music feed</h2>
      <Signup />
      <Posts />
    </>
  );
>>>>>>> Stashed changes
}

export default App;
