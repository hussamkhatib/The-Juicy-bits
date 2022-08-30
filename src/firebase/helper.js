import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getClient } from "../../utils/sanity";
import { getFirebase } from ".";
const { firestore, auth } = getFirebase();

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
  let total = 0;
  const products = await getClient()
    .fetch(query)
    .then((productsArr) => {
      return productsArr.map((product, i) => {
        total += product.defaultProductVariant.price * firebaseData[i].count;
        return {
          ...product,
          count: firebaseData[i].count,
        };
      });
    });
  return { products, total };
};

export async function addProductToCartFB(id) {
  const docRef = doc(firestore, `users/${auth.currentUser.uid}/cart/${id}`);
  await setDoc(docRef, {
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

export async function completeCheckout(products, shippingAddress, total) {
  const orderCol = collection(firestore, `users/${auth.currentUser.uid}/order`);

  const productsArr = products.map((product) => {
    const docRef = doc(
      firestore,
      `/users/${auth.currentUser.uid}/cart/${product._id}`
    );
    deleteDoc(docRef);
    return {
      id: product._id,
      count: product.count,
      price: product.defaultProductVariant.price,
    };
  });
  const { id } = await addDoc(orderCol, {
    orderCompletedAt: serverTimestamp(),
    shippingAddress,
    products: productsArr,
    total,
  });
  return id;
}

export async function getUserOrders() {
  const docRef = collection(firestore, `users/${auth.currentUser.uid}/order`);
  const docSnap = await getDocs(docRef);
  const data = docSnap.docs.map((doc) => {
    const data = doc.data();
    // nano-seconds is not important, hence appending 000 to it
    const orderCompletedAt = new Date(
      +`${data.orderCompletedAt.seconds}000`
    ).toDateString();
    return { ...data, orderCompletedAt };
  });
  return data;
}
