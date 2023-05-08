import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyBd_p-7kKRAWRyCVOtCUVBX8fKDO0wzGSE",
    authDomain: "filmy-7a4ab.firebaseapp.com",
    projectId: "filmy-7a4ab",
    storageBucket: "filmy-7a4ab.appspot.com",
    messagingSenderId: "592515146474",
    appId: "1:592515146474:web:6f8a9b305ee5e2d0302d93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
