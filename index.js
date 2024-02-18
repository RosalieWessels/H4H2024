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

var email = "";
var array = [];
var i = 0;

// Get a reference to the storage service, which is used to create references in your storage bucket
//const storage = getStorage();

// Create a storage reference from our storage service
// const storageRef = ref(storage);
var storageRef = firebase.storage().ref();

const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

console.log(uid())

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
    email = user.email;
    document.getElementById("login").style.display = 'none';
    document.getElementById("signup").style.display = 'none';
    document.getElementById("navbar").innerHTML = `<li class="newsreader-400" style="float:right; padding-top: 10px;" onclick="firebase.auth().signOut();"><a href="" class="last-button">Sign Out</a></li> ` + document.getElementById("navbar").innerHTML;
    } else {
    // User is signed out
    // ...
    }
});

function addToCart(id) {
    var docRef = db.collection("carts").doc(email);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            items = doc.data().items;
            items.push(array[id]);

            // Set the "capital" field of the city 'DC'
            return docRef.update({
                items: items
            })
            .then(() => {
                console.log("Document successfully updated!");
                alert("Successfully added to cart!");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            db.collection("carts").doc(email).set({
                email: email,
                items: [array[id]]
            })
            .then(() => {
                console.log("Document successfully written!");
                alert("Successfully added to cart!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        db.collection("carts").doc(email).set({
            email: email,
            items: [array[id]]
        })
        .then(() => {
            console.log("Document successfully written!");
            alert("Successfully added to cart!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}

function createCards() {
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
                array.push(doc.data().image);
                cards.innerHTML += 
                `<div class="card">
                    <div class="card__content">
                        <img class="card__img" src="${url}">
                        <h1 class="card__header newsreader-800">${doc.data().title} - $${doc.data().price}</h1>
                        <p class="card__text newsreader-400" >${doc.data().description}</p>
                        <button class="pill-button">${doc.data().category}</button> 
                        <button class="pill-button">${doc.data().availability}</button>
                        <button class="card__btn newsreader-800" style="margin-top: 10px;" onclick="addToCart(${i})">Add to Cart<span>&rarr;</span></button>
                    </div>
                </div>`;
                i++;
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