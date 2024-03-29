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



function uploadItem() {
    console.log("MADE IT INTO UPLOAD ITEM");
    var title = document.getElementById("itemName").value;
    var category = document.getElementById("category");
    var categoryText = category.options[category.selectedIndex].text;
    var description = document.getElementById("itemDescription").value;
    var availability = document.getElementById("availabilty");
    var availabilityText = availability.options[availability.selectedIndex].text;
    var price = document.getElementById("price").value;
    var imageId = uid()
    console.log(title, categoryText, description, availabilityText, price);

    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0]; // Get the selected file

    console.log(file);
  
    // Create a storage reference with a unique name (e.g., using timestamp)
    const storageRef = storage.ref(`${imageId}`);
  
    // Upload the file
    const uploadTask = storageRef.put(file);
  
    // Monitor upload progress (optional)
    uploadTask.on("state_changed",
      (snapshot) => {
        // Handle progress (e.g., update a progress bar)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
      (error) => {
        // Handle errors (e.g., display an error message)
        console.error("Error uploading image:", error);
      },
      () => {
        // Upload completed successfully
        console.log("Image uploaded successfully!");

        // spaceRef = storageRef.child(imageId);
        storageRef.getDownloadURL().then(function(url) {
            // Handle the download URL (e.g., display the image in an <img> tag)
            console.log('Download URL:', url);
            db.collection("items").doc(imageId).set({
              title: title,
              category: categoryText,
              description: description,
              availability: availabilityText,
              price: Number(price),
              image: imageId,
              url: url
      
          })
          .then(() => {
              console.log("Document successfully written!");
              alert("We successfully uploaded your item!");
              window.location.href = "shop.html";
          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });

        }).catch(function(error) {
            // Handle any errors
            console.error('Error retrieving image:', error);
        });

      }
    );
    
}


