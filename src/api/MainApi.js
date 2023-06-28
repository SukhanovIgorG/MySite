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
const userRef = userId ? doc(db, 'users', userId) : null; // TODO: Рефы упорядочить


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
    })
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

export const getUserInfo = async () => {
  const userRef = userId ? doc(db, 'users', userId) : null;
  const userInfo = userRef ? await getDoc(userRef) : null;
  if (userInfo.exists()) {
    return userInfo.data();
  } else {
    throw new Error('Document not found');
  }
};

export const updateUser = async (name, email) => {
  try {
    const userRef = userId ? doc(db, 'users', userId) : null;
    return await updateDoc(userRef, {
      name: name,
      email: email,
    });
  } catch (e) {
    console.log('updateUser error :>> ', e.message);
    throw new Error('User not updated');
  }

};

export const likeMovies = async (name) => {
  console.log('likeMovies name :>> ', name);
  try {
    return await updateDoc(userRef, {
      movies: arrayUnion(name),
    });
  } catch (e) {
    console.log('likeMovies error :>> ', e.message);
    throw new Error('Movie not liked');
  }

};

export const disLakeMovies = async (name) => {
  try {
    await updateDoc(userRef, {
      movies: arrayRemove(name),
    });
  } catch (e) {
    console.log('disLakeMovies error :>> ', e.message);
    throw new Error('Movie not disliked');
  }
};
