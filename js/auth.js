//var ui = new firebaseui.auth.AuthID(firebase.auth());

// Funksjon for innlogging
var email;
var password;

function signIn() {/*
  window.alert('hfahjaf');
  email = document.getElementById('email').value;
  password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Feil brukernavn eller passord.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    window.location = 'overview.html'; //After successful login, user will be redirected to overview.html
    console.log('successful');
  } else {
    //...
  }
})*/
}

// Sjekker om brukeren er logget inn
function validUser(){
  firebase.auth().onAuthStateChanged(user => {
    if(user) {

    } else {
    }
  });
}

// Funksjon for utlogging
function signOut() {
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
window.location = 'index.html';
}

// Bare en link til brukerregistreringen
function tilSignUp() {
  window.location = 'signup.html';
}

// Funksjon for Ã¥ registrere bruker med mail og passord.
function signUp() {
  email = document.getElementById('regemail').value;
  password = document.getElementById('regpassword').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // [START_EXCLUDE]
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
  // [END_EXCLUDE]
});
window.alert('Registrering fullfÃ¸rt');
}

function addFish() {
  var firebaseRef = firebase.database().ref().child('fisk').push();
  var dbart = document.getElementById('art').value;
  var dbweight = document.getElementById('weight').value;
  var dblength = document.getElementById('length').value;

  if(dbart == "" || dbweight == "") {
    window.alert ("Fyll inn alle feltene");
  } else {

    firebaseRef.child("species").set(dbart);
    firebaseRef.child("weigth").set(dbweight);
    firebaseRef.child("length").set(dblength);

    window.alert('Lagt til i database');
  }
}
