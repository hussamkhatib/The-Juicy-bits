import cuid from "cuid";
import {
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { auth, firestore } from ".";

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const { user } = await firebaseSignInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: getUser(user) };
  } catch (error) {
    return { error };
  }
};

export const logInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then(async (result) => {
      if (getAdditionalUserInfo(result).isNewUser) {
        const user = result.user;
        const { displayName, email, uid } = user;
        createUser({
          displayName,
          email,
          uid,
        });
      }
    });
  } catch (err) {
    console.error(err);
    return err;
  }
};

/**
 *
 * @param { string } email - useremail
 * @param { string } password - userpassword
 * @param { Object } options - { sendEmailVerification ,displayName,}
 * @returns
 */
export const createUserWithEmailAndPassword = async (
  email,
  password,
  options
) => {
  try {
    const { user } = await firebaseCreateUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (options && options.sendEmailVerification && user.user) {
      await sendEmailVerification(user.user, options.emailVerificationOptions);
    }
    createUser(user, { displayName: options.displayName });
    return { user: getUser(user) };
  } catch (error) {
    return { error };
  }
};

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

/**
 * @param {Object} userDetails
 */
export const updateUserDetails = async (userDetails) => {
  const docRef = doc(firestore, `users/${auth.currentUser.uid}`);
  await updateDoc(docRef, userDetails);
};

export const updateUserShippingDetails = async (details) => {
  const docRef = doc(firestore, `users/${auth.currentUser.uid}`);
  const id = cuid();
  await updateDoc(docRef, {
    ShippingAddress: arrayUnion({ ...details, id }),
  });
};

function getUser(user) {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    // phoneNumber: user.phoneNumber,
    // photoURL: user.photoURL,
  };
}
