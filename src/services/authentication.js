import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

export const signup = async (email, pw) => {
  const res = await createUserWithEmailAndPassword(auth, email, pw);
  return res.user;
};

export const signin = async (email, pw) => {
  const res = await signInWithEmailAndPassword(auth, email, pw);
  return res;
};

export const signout = async () => {
  await signOut(auth);
}
