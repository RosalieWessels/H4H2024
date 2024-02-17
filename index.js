// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyATzuEEeKwr9tht1-VZhWzjPcMue6hT3Us",
authDomain: "santa-clara-swap.firebaseapp.com",
projectId: "santa-clara-swap",
storageBucket: "santa-clara-swap.appspot.com",
messagingSenderId: "765275523808",
appId: "1:765275523808:web:6ffa04584f7f877853de85",
storageBucket: 'santa-clara-swap.appspot.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
