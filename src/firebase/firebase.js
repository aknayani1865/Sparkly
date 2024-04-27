import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyArQ4TWnKlRFtZ0bOfGtUmZ7zCHP_kbQ7Q",
	authDomain: "instagram-34920.firebaseapp.com",
	databaseURL: "https://instagram-34920-default-rtdb.firebaseio.com/",
	projectId: "instagram-34920",
	storageBucket: "instagram-34920.appspot.com",
	messagingSenderId: "1091665051593",
	appId: "1:1091665051593:web:c5d0f3dd1369c18949b218",
	measurementId: "G-LWJ4PB7YBG"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
