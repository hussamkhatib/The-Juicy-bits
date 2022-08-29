import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getClient } from "../../utils/sanity";
import { getFirebase } from ".";
import { getUser } from "./util";
const { firestore, auth } = getFirebase();

export const createUser = async (user, overide) => {
  const docRef = doc(firestore, `users/${auth.currentUser.uid}`);
  const userDetails = getUser(user);
  await setDoc(docRef, { ...userDetails, ...overide });
};

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
  const firebaseData = docSnap.docs.map((doc) => doc.data());
  const productIds = firebaseData.map((i) => `'${i.id}'`).join(",");
  const query = `*[_type == "product" && _id in 
    [
    ${productIds}
    ]
  ]
  `;
  const products = getClient()
    .fetch(query)
    .then((productsArr) => {
      return productsArr.map((product, i) => ({
        ...product,
        count: firebaseData[i].count,
      }));
    });
  return products;
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

export async function updateProductCountInCartFB(id, count) {
  const docRef = doc(firestore, `users/${auth.currentUser.uid}/cart/${id}`);
  await updateDoc(docRef, {
    count: increment(count),
  });
}
