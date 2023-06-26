import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./firebase";

export const signup = async (email, pw) => {
  const res = createUserWithEmailAndPassword(auth, email, pw);
  return res;
};

export const signin = async (email, pw) => {
  const res = await signInWithEmailAndPassword(auth, email, pw);
  return res;
};
