(function() {
  const config = {
    apiKey: "hidden",
    authDomain: "hidden",
    databaseURL: "hidden",
    storageBucket: "hidden"
  };
  firebase.initializeApp(config);

  const txtEmail = document.getElementById('email');
  const txtPassword = document.getElementById('password');
  const regEmail = document.getElementById('regemail');
  const regPassword = document.getElementById('regpassword');
  const regUsername = document.getElementById('regusername');
  const regNewUsername = document.getElementById('regnewusername');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogOut = document.getElementById('btnLogOut');
  const btnResetPassword = document.getElementById('btnResetPassword');
  const feilmeld = document.getElementById('feilinnlogging');





  btnSignUp.addEventListener('click', e => {
    // Henter epost og passord fra input
    const email = regEmail.value;
    const pass = regPassword.value;
    const auth = firebase.auth();

    //Logg inn
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => feilmeld.innerHTML = e.message);

  });







  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      window.location = 'overview.html';
    } else {
      console.log('Ikke innlogget');
    }
  });

}());
