import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { getFirebase } from ".";
const { firestore, auth } = getFirebase();

export const getUserDetails = async () => {
  const docRef = doc(firestore, `users/${auth.currentUser.uid}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error("No such document!");
    return null;
  }
};

export const getUserCart = async () => {
  const docRef = collection(firestore, `users/${auth.currentUser.uid}/cart`);
  const docSnap = await getDocs(docRef);
  return docSnap.docs.map((doc) => doc.data());
};

export async function addProductToCartFB(id) {
  const cartCol = doc(firestore, `users/${auth.currentUser.uid}/cart/${id}`);
  await setDoc(cartCol, {
    id,
    count: 1,
  });
}

export async function deleteProductFromCartFB(id) {
  const docRef = doc(firestore, `users/${auth.currentUser.uid}/cart/${id}`);
  await deleteDoc(docRef);
}
