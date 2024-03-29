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
var storageRef = firebase.storage().ref();

var email = "";
var array = [];
var k = 0;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    console.log("logged in");
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
    getCartItems();
});

function getCartItems() {
    console.log("user email", email);
    var d = 0;
    db.collection("carts").where("email", "==", email)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            items = doc.data().items;
            var len = items.length;
            console.log(items, len);
            arr = items;
            console.log(len);
            for (i = 0; i < len; i++) {
                makeCards(items[i]);
                // console.log(i, items[i]);
                // var imageName = items[i];
                // var spaceRef = storageRef.child(imageName);
                // spaceRef.getDownloadURL().then(function(url) {
                //     // Handle the download URL (e.g., display the image in an <img> tag)
                //     console.log('Download URL:', url);
                //     console.log("IMAGE ID", imageName);
                //     makeCards(arr, url, d);
                //     d++;
                // }).catch(function(error) {
                //     // Handle any errors
                //     console.error('Error retrieving image:', error);
                // });
            }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

}

function deleteFromCart(imageName) {
    var docRef = db.collection("carts").doc(email);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            items=doc.data().items;
            console.log("OLD ARRAY", items, imageName, array, array[imageName]);
            const index = items.indexOf(array[imageName]);
            console.log(index);
            if (index > -1) {
                items.splice(index, 1); // Remove one item at the specified index
            }

            console.log("NEW ARRAY", items, array, imageName)

            return docRef.update({
                items: items
            })
            .then(() => {
                console.log("Document successfully updated!");
                alert("Successfully deleted from cart!");
                window.location.href="cart.html";
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function makeCards(name) {
    // name = arr[d];
    // console.log(name, url);
    db.collection("items").doc(name).get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            var cards = document.getElementById("cards");
            array.push(name);
            cards.innerHTML += 
            `<div class="card">
                <div class="card__content">
                    <img class="card__img" style="height: 16rem;" src="${doc.data().url}">
                    <h1 class="card__header newsreader-800">${doc.data().title} - $${doc.data().price}</h1>
                    <p class="card__text newsreader-400" >${doc.data().description}</p>
                    <button class="login-button" onclick="deleteFromCart(${k})">Remove</button>
                </div>
            </div>`;
            k++;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

