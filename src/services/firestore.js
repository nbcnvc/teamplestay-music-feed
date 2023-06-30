import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION_NAME = "posts";
const COLLECTION = collection(db, COLLECTION_NAME);

export const getDataFromFS = async () => {
  const docArr = await getDocs(COLLECTION);
  return docArr.docs;
};

export const createData = (post) => {
  addDoc(COLLECTION, post);
};

export const updateData = async (postId, updatedData) => {
  const postRef = doc(COLLECTION, postId);
  await updateDoc(postRef, updatedData);
};

export const deleteData = async (postId) => {
  const postRef = doc(COLLECTION, postId);
  await deleteDoc(postRef);
};
