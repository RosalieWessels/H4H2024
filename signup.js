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

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/v8/firebase.User
//       var uid = user.uid;
//       alert("ALERT: A user is already signed in");
//     } else {
//       // User is signed out
//       // ...
//     }
//   });

function createNewUser() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;

    console.log("In function", password, password2);

    if (password == password2 && email.includes("@scu.edu")) {
        console.log("adding it in");
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            alert("Created new user account, welcome to Santa Clara Swap");
            window.location.href = "shop.html";
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
    }
}