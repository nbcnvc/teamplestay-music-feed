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

export const createData = async (post) => {
  const docRef = await addDoc(COLLECTION, post);
  return docRef;
};

export const updateData = async (postId, updatedData) => {
  const postRef = doc(COLLECTION, postId);
  await updateDoc(postRef, updatedData);
};

export const deleteData = async (postId) => {
  const postRef = doc(COLLECTION, postId);
  await deleteDoc(postRef);
};
