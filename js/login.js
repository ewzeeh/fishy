(function() {
  const config = {
    apiKey: "AIzaSyCaA8H8ewnFd1Es4miZi3w3bp6y5dkJ0VE",
    authDomain: "fishy-bf1e5.firebaseapp.com",
    databaseURL: "https://fishy-bf1e5.firebaseio.com",
    storageBucket: "fishy-bf1e5.appspot.com"
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

  btnResetPassword.addEventListener('click', e => {
    // Henter epost og passord fra input
    const email = txtEmail.value;
    const auth = firebase.auth();

    //Logg inn
    const promise = auth.sendPasswordResetEmail(email);
    feilmeld.innerHTML = 'Følg instruksjoner sendt til ' + email;
    promise.catch(e => feilmeld.innerHTML = e.message);

  });

  btnLogin.addEventListener('click', e => {
    // Henter epost og passord fra input
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //Logg inn
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => feilmeld.innerHTML = e.message);

  });

  // btnSignUp.addEventListener('click', e => {
  //   // Henter epost og passord fra input
  //   const email = regEmail.value;
  //   const pass = regPassword.value;
  //   const auth = firebase.auth();
  //
  //   //Logg inn
  //   const promise = auth.createUserWithEmailAndPassword(email, pass);
  //   promise.catch(e => console.log(e.message));
  //
  // });



  // btnLogOut.addEventListener('click', e => {
  //   firebase.auth().signOut();
  // });



  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      window.location = 'landing.html';
    } else {
      console.log('Ikke innlogget');
    }
  });

}());
