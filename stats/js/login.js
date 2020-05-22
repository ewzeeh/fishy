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



  btnLogin.addEventListener('click', e => {
    // Henter epost og passord fra input
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const eg = 'eivind.gudmundsen@live.no';
    const g = 'gudmundsen90@gmail.com';
    const jj = 'eidsmo96@hotmail.com';

    if (email == eg || email == g || email == jj) {
      //Logg inn
      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.catch(e => alert(e.message));
    } else {
      alert('Bruker er ikke registrert');
    }



  });





  // btnLogOut.addEventListener('click', e => {
  //   firebase.auth().signOut();
  // });



  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      window.location = 'stats.html';
    } else {
      console.log('Ikke innlogget');
    }
  });

}());
