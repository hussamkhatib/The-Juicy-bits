import {
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
} from "firebase/auth";

import { getFirebase } from ".";

const { auth } = getFirebase();
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const { user } = await firebaseSignInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return getUser(user);
  } catch (err) {
    console.error(err);
    return err;
  }
};

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
    return getUser(user);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export function getUser(user) {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
  };
}
