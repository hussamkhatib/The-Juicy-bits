import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "evolution-58334.firebaseapp.com",
  projectId: "evolution-58334",
  storageBucket: "evolution-58334.appspot.com",
  messagingSenderId: "3932018608",
  appId: "1:3932018608:web:13cf0e62debf99067ce875"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};


const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();