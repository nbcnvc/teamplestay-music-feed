import { addDoc, collection, getDocs } from "firebase/firestore";

import { db } from "./firebase";

const COLLECTION_NAME = 'posts';
const COLLECTION = collection(db, COLLECTION_NAME)

export const getDataFromFS = async () => {
  const docArr = await getDocs(COLLECTION);
  return docArr.docs
};

export const createData = (post) => {
  addDoc(COLLECTION, post)
}
