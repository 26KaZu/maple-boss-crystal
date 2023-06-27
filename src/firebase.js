import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQTsWFW5x7s1_MkvSZZINVB3X6xRlZy6s",
  authDomain: "maple-boss-crystal.firebaseapp.com",
  projectId: "maple-boss-crystal",
  storageBucket: "maple-boss-crystal.appspot.com",
  messagingSenderId: "609723565156",
  appId: "1:609723565156:web:7439d1172728e899d0cb71",
  measurementId: "G-NY6H2CRLPK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const obtainUserDoc = (user) => doc(db, "users", user?.uid);

const obtainDoc = (collection, document) => {
  const docRef = doc(db, collection, document);
  const docSnap = getDoc(docRef);

  return docSnap;
};

const putDoc = (collection, document, newObject) => {
  const docRef = doc(db, collection, document);
  const update = updateDoc(docRef, newObject);

  return update;
};

const loginWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmail = async (email, password, name) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      characters: [],
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const resetPassword = async (email) => {
  sendPasswordResetEmail(auth, email);
};

const logout = async () => {
  await signOut(auth);
  window.location.reload();
};

export {
  auth,
  loginWithEmail,
  registerWithEmail,
  resetPassword,
  logout,
  obtainUserDoc,
  obtainDoc,
  putDoc,
};
