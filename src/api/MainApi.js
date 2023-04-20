import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {firebaseConfig} from '../fireBaseConfig';
import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import {updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const usersRef = collection(db, 'users');
let userId = localStorage.getItem('userId');
const userRef = userId ? doc(db, 'users', userId) : null;

export const fireBaseAuthApi = async ({
  type,
  name = 'new user',
  email,
  password,
}) => {
  if (type === 'signup') {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser = userCredential.user;
    setDoc(doc(usersRef, newUser.uid), {
      name: name,
      email: email,
      password: password,
      movies: [],
      createdAt: newUser.metadata.createdAt,
      creationTime: newUser.metadata.creationTime,
    });
    return userCredential;
  }
  if (type === 'signin') {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  }
};

export const registerApi = async ({name, email, password}) => {
  console.log('registerApi :>> ');
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const newUser = userCredential.user;
  setDoc(doc(usersRef, newUser.uid), {
    name: name,
    email: email,
    password: password,
    movies: [],
    createdAt: newUser.metadata.createdAt,
    creationTime: newUser.metadata.creationTime,
  });
  return newUser;
};

export const loginApi = ({email, password}) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const getUserInfo = async () => {
  const userInfo = userRef ? await getDoc(userRef) : null;
  if (userInfo.exists()) {
    return userInfo.data();
  } else {
    throw new Error('Document not found');
  }
};

export const updateUser = async (name) => {
  return await updateDoc(userRef, {
    name: name,
  });
};

export const likeMovies = async (name) => {
  return await updateDoc(userRef, {
    movies: arrayUnion(name),
  });
};

export const disLakeMovies = async (name) => {
  await updateDoc(userRef, {
    movies: arrayRemove(name),
  });
};
