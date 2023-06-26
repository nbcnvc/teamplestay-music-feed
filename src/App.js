import React, { useEffect } from "react";
import { auth } from "./services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function App() {
  useEffect(() => {
    createUserWithEmailAndPassword();
  }, []);
  return <div>firebase</div>;
}

export default App;
