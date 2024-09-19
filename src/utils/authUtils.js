// src/utils/authUtils.js
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed up:', user);
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error; // Rethrow error to handle it in the caller
  }
};
