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

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
    document.getElementById("login").style.display = 'none';
    document.getElementById("signup").style.display = 'none';
    document.getElementById("navbar").innerHTML = `<li class="newsreader-400" style="float:right; padding-top: 10px;" onclick="firebase.auth().signOut();"><a href="" class="last-button">Sign Out</a></li> ` + document.getElementById("navbar").innerHTML;
    } else {
    // User is signed out
    // ...
    }
});