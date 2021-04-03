import firebase from 'firebase/app'
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore"
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBGGp1PpgOjPTrXk-OeTxCuIHo_vlugGJA",
  authDomain: "evolution-3d12a.firebaseapp.com",
  databaseURL: "https://evolution-3d12a-default-rtdb.firebaseio.com",
  projectId: "evolution-3d12a",
  storageBucket: "evolution-3d12a.appspot.com",
  messagingSenderId: "143379502680",
  appId: "1:143379502680:web:7d64de205c2e5e679d9c2d",
  measurementId: "G-FBDY04G1D1"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//const projectStorage = firebase.storage();
//const projectFireStore = firebase.firestore();

//export { projectStorage,projectFireStore };