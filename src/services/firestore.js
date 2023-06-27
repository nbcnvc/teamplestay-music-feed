import { collection, getDocs } from "firebase/firestore";

import { db } from "./firebase";

const COLLECTION_NAME = 'posts';

export const getDataFromFS = async () => {
  const docArr = await getDocs(collection(db, COLLECTION_NAME));
  return docArr.docs
};
