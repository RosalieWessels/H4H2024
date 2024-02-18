// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getStorage } from "firebase/storage";


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
firebase.initializeApp(firebaseConfig);
db = firebase.firestore();
storage = firebase.storage()

// Get a reference to the storage service, which is used to create references in your storage bucket
//const storage = getStorage();

// Create a storage reference from our storage service
// const storageRef = ref(storage);
var storageRef = firebase.storage().ref();

const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

console.log(uid())

function createCard() {
    db.collection("items")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            var imageName = doc.data().image;
            var spaceRef = storageRef.child(imageName);
            spaceRef.getDownloadURL().then(function(url) {
                // Handle the download URL (e.g., display the image in an <img> tag)
                console.log('Download URL:', url);
                var cards = document.getElementById("cards");
                cards.innerHTML += 
                `<div class="card">
                    <div class="card__content">
                        <img class="card__img" src="${url}">
                        <h1 class="card__header newsreader-800">${doc.data().title} - $${doc.data().price}</h1>
                        <p class="card__text newsreader-400" >${doc.data().description}</p>
                        <button class="pill-button">${doc.data().category}</button> 
                        <button class="pill-button">${doc.data().availability}</button>
                        <button class="card__btn newsreader-800" style="margin-top: 10px;">Add to Cart<span>&rarr;</span></button>
                    </div>
                </div>`
            }).catch(function(error) {
                // Handle any errors
                console.error('Error retrieving image:', error);
            });
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}


createCard();