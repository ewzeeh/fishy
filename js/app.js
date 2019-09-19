(function() {
  const config = {
    apiKey: "hidden",
    authDomain: "hidden",
    databaseURL: "hidden",
    storageBucket: "hidden"
  };
  firebase.initializeApp(config);

  //Hente data fra input

  const species = document.getElementById('art');

  // Create references

  const dbRefObject = firebase.database().ref().child('fisk');

  // Sync  object changes

  dbRefObject.on('value', snap => console.log(snap.val()));
  getUserData();

}());



function getUserData() {
  var user = firebase.auth().currentUser;

  if (user != null) {
    user.providerData.forEach(function(profile) {

      document.getElementById('usrEmail').innerHTML = profile.email;
      document.getElementById('usrUsername').innerHTML = profile.displayName;
      // document.getElementById('usernameEdit').value = profile.displayName;

    });
  }
}


// Skriver fra form til database
function addFish() {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = dd + '/' + mm + '/' + yyyy;


  var firebaseRef = firebase.database().ref().child('fisk').push();
  var dbart = document.getElementById('species').value;
  var dbweight = document.getElementById('weight').value;
  var dblength = document.getElementById('length').value;
  const userr = firebase.auth().currentUser.email;
  var userNameAdd = firebase.auth().currentUser.displayName;
  var dbplace = document.getElementById('place').value;
  var nameOutput = userr.substring(0, userr.lastIndexOf("@"));


  if (dbart == "" || dbweight == "" || dblength == "") {
    //  window.alert("Fyll inn alle feltene");
    document.getElementById('regOutput').innerText = 'Fyll inn alle feltene';
  } else if (userNameAdd == null) {
    document.getElementById('regOutput').innerText = 'Gå til profilen din og fyll inn brukernavn før du legger til din fangst';
  } else {
    firebaseRef.child("species").set(dbart);
    firebaseRef.child("weigth").set(dbweight);
    firebaseRef.child("length").set(dblength);
    firebaseRef.child("username").set(userNameAdd);
    firebaseRef.child("date").set(today);
    firebaseRef.child("place").set(dbplace);

    //  window.alert('Lagt til i database');
    document.getElementById('regSuccess').innerText = 'Lagt til i database';
    window.location = 'records.html';
  }
}

// Skriver fra database til html-tabell
function dataToTable() {

  var database = firebase.database().ref().child('fisk').orderByKey();
  database.once('value', function(snapshot) {
    if (snapshot.exists()) {
      var content = '';
      snapshot.forEach(function(data) {
        var val = data.val();
        content += '<tr>';
        content += '<td>' + val.date + '</td>';
        content += '<td>' + val.username + '</td>';
        content += '<td class="species">' + val.species + '</td>';
        content += '<td>' + val.weigth + ' kg' + '</td>';
        content += '<td>' + val.length + ' cm' + '</td>';
        content += '<td><a class="map" href="https://maps.google.com/?q=' + val.place + '" target="_blank">' + val.place + '</a></td>';
        content += '</tr>';
      });
      $('#ex-table').append(content);
    }
  });

}

function sort() {
  const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

  const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
  )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

  // do the work...
  document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
      .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
      .forEach(tr => table.appendChild(tr));
  })));
}

function signOut() {
  firebase.auth().signOut();
}




function updateUserData() {
  var newUsername = document.getElementById('usernameEdit').value;
  const dbMail = firebase.auth().currentUser.email;
  var dbBrukerNavn = firebase.auth().currentUser.displayName;
  var dbProfilbilde = firebase.auth().currentUser.photoURL;
  // console.log(newImg);
  console.log(newUsername);

  var user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: newUsername,
    // photoURL: newImg
  }).then(function() {
    // Update successful.
    console.log('Oppdatering vellykket');
    document.getElementById('feedback').innerHTML = 'Oppdatering vellykket!';

    // Skriver data til database
    userdataToDatabase();
    location.reload();



  }).catch(function(error) {
    // An error happened.
    console.log('Oppdatering mislykket');
    document.getElementById('feedback').innerHTML = 'Brukernavn kan ikke fjernes, men du må gjerne endre det.';
  });
}

function userdataToDatabase() {
  const dbMail = firebase.auth().currentUser.email;
  var dbBrukerNavn = firebase.auth().currentUser.displayName;
  var dbProfilbilde = firebase.auth().currentUser.photoURL;


  var firebaseRef = firebase.database().ref().child('bruker');
  firebaseRef.child('User' + dbBrukerNavn).set({
    email: dbMail,
    username: dbBrukerNavn,
    pic: dbProfilbilde
  });
}

function showProfilePic() {

  // Create a reference from a Google Cloud Storage URI
  // var gsReference = storage.refFromURL('gs://fishy-bf1e5.appspot.com/profilepictures/profilbilde'+firebase.auth().currentUser.email.substring(0, firebase.auth().currentUser.email.lastIndexOf("@")));
  // Create a reference from an HTTPS URL
  // Note that in the URL, characters are URL escaped!
  // var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/ishy-bf1e5.appspot.com/profilepictures/profilbilde'+firebase.auth().currentUser.email.substring(0, firebase.auth().currentUser.email.lastIndexOf("@")));

  var user = firebase.auth().currentUser;
  var storageRef = firebase.storage().ref();

  storageRef.child('profilepictures/profilbilde' + user.email.substring(0, user.email.lastIndexOf("@"))).getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'
    console.log(url);
    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element:
    var img = document.getElementById('usrImg');
    img.src = url;
    // document.getElementById('profImg').src = url;
  }).catch(function(error) {
    // Handle any errors
    console.error(error);
  });

}

function uploadFileToStorage(file) {

}

function profile() {
  window.location = 'profile.html';
}
