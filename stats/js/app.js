(function() {
  const config = {
    apiKey: "AIzaSyCaA8H8ewnFd1Es4miZi3w3bp6y5dkJ0VE",
    authDomain: "fishy-bf1e5.firebaseapp.com",
    databaseURL: "https://fishy-bf1e5.firebaseio.com",
    storageBucket: "fishy-bf1e5.appspot.com"
  };
  firebase.initializeApp(config);
}());

var bioTemp;

function getBio() {
  const userr = firebase.auth().currentUser.email;
  const userNameAdd = firebase.auth().currentUser.displayName;
  var database = firebase.database().ref('bruker/User' + userNameAdd);
  database.on('value', function(snapshot) {
    if (snapshot.exists()) {
      var content = '';
      var ifUndefined = '<a href="editprofile.html">' + 'Legg til bio' + '</a>';

      // console.log(snapshot.key)
      var val = snapshot.val();
      content += val.bio;
      bioTemp = content;
      // console.log(content);


    }
    if (content == 'undefined') {
      $('#userBio').append(ifUndefined);
    } else {
      $('#userBio').append(content.replace(/\n/g, "<br />"));
    }
  });

  setTimeout(function() {
    userdataToDatabaseNumbers();
  }, (1000));

}



function getUserData() {
  var user = firebase.auth().currentUser;
  var img = document.getElementById('profilepicture');

  if (user != null) {
    user.providerData.forEach(function(profile) {

      // document.getElementById('usrEmail').innerHTML = profile.email;
      document.getElementById('username').innerHTML = profile.displayName;
      let lowercaseUrlTemp = profile.displayName;
      let lowercaseUrl = lowercaseUrlTemp.toLowerCase();
      img.src = 'https://aarvikgudmundsen.no/fisk/uploads/profilbilde' + lowercaseUrl + '.png';

    });
  }
}



var numPersFish;

function numberOfFishAndUsers() {

  var database = firebase.database().ref().child('fisk').orderByKey();
  var userdb = firebase.database().ref().child('bruker').orderByKey();
  const userNameAdd = firebase.auth().currentUser.displayName;
  var persFishDb = firebase.database().ref().child('Personal' + userNameAdd).orderByKey();

  database.once('value', function(snapshot) {

    var numFish = snapshot.numChildren();
    document.getElementById('numFish').innerHTML = numFish;

  });

  userdb.once('value', function(snapshot) {

    var numUsers = snapshot.numChildren();
    document.getElementById('numUsers').innerHTML = numUsers;

  });

}

function numberOfTrouts() {
  const database = firebase.database().ref().child('fisk');
  database.orderByChild("species").equalTo('Ørret').on("value", function(snapshot) {
    document.getElementById('numTrout').innerHTML = snapshot.numChildren();
  })
}

function numberOfPollocks() {
  const database = firebase.database().ref().child('fisk');
  database.orderByChild("species").equalTo('Sei').on("value", function(snapshot) {
    document.getElementById('numPollock').innerHTML = snapshot.numChildren();
  })
}

function numberOfMackerels() {
  const database = firebase.database().ref().child('fisk');
  database.orderByChild("species").equalTo('Makrell').on("value", function(snapshot) {
    document.getElementById('numMackarel').innerHTML = snapshot.numChildren();
  })
}

function numberOfCods() {
  const database = firebase.database().ref().child('fisk');
  database.orderByChild("species").equalTo('Torsk').on("value", function(snapshot) {
    document.getElementById('numCod').innerHTML = snapshot.numChildren();
  })
}

function numberOfPerches() {
  const database = firebase.database().ref().child('fisk');
  database.orderByChild("species").equalTo('Abbor').on("value", function(snapshot) {
    document.getElementById('numPerch').innerHTML = snapshot.numChildren();
  })
}

function numberOfPollacks() {
  const database = firebase.database().ref().child('fisk');
  database.orderByChild("species").equalTo('Lyr').on("value", function(snapshot) {
    document.getElementById('numPollack').innerHTML = snapshot.numChildren();
  })
}

function printNumberOfSpecies() {
  numberOfTrouts();
  numberOfPollocks();
  numberOfMackerels();
  numberOfCods();
  numberOfPerches();
  numberOfPollacks();
}

function speciesBarChart() {
  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#858796';

  function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
      };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }

  // Bar Chart Example
  var ctx = document.getElementById("speciesBarChart");
  var myBarChart1 = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Ørret", "Sei", "Makrell", "Torsk", "Abbor", "Lyr"],
      datasets: [{
        label: "Antall",
        backgroundColor: ["#FF5733", "#c9c9c9", "#BCE832", "#2FEAE5", "#3A66FB", "#a35c00"],
        // hoverBackgroundColor: ["#224abe",],
        borderColor: "#4e73df",
        data: [7, 9, 1, 4, 1, 6],
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        },
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'month'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            // maxTicksLimit: 1
          },
          maxBarThickness: 25,
        }],
        yAxes: [{
          ticks: {
            min: 0,
            // max: 15000,
            maxTicksLimit: 100,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return '' + number_format(value);
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
          }
        }
      },
    }
  });

}

function pieChart() {

  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#858796';

  // Pie Chart Example
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {


    type: 'doughnut',
    data: {
      labels: ["Ørret", "Sei", "Makrell", "Torsk", "Abbor", "Lyr"],
      datasets: [{
        data: [7, 9, 1, 4, 1, 6],
        backgroundColor: ['#FF5733', '#C9C9C9', '#BCE832', '#2FEAE5', '#3A66FB', '#a35c00'],
        hoverBackgroundColor: ['#BD4329', '#727272', '#789422', '#1E8986', '#2946A7', '#6e3e01'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });

}

function barchart() {
  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#858796';

  function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
      };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }

  // Bar Chart Example
  var ctx = document.getElementById("myBarChart");
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["JJ - Ørret", "Eivind - Ørret", "JJ - Sei", "Eivind - Sei", "JJ - Makrell", "Eivind - Makrell",
      "JJ - Torsk", "Eivind - Torsk", "JJ - Abbor", "Eivind - Abbor", "JJ - Lyr", "Eivind - Lyr"],
      datasets: [{
        label: "Antall",
        backgroundColor: ["#36abff", "#ff531f", "#36abff", "#ff531f", "#36abff", "#ff531f","#36abff", "#ff531f","#36abff", "#ff531f","#36abff", "#ff531f"],
        // hoverBackgroundColor: "#2e59d9",
        borderColor: "#4e73df",
        data: [4, 2, 0, 9, 0, 1, 1, 3, 0, 1, 0, 6],
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'month'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            // maxTicksLimit: 1
          },
          maxBarThickness: 25,
        }],
        yAxes: [{
          ticks: {
            min: 0,
            // max: 15000,
            maxTicksLimit: 100,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return '' + number_format(value);
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
          }
        }
      },
    }
  });

}



function sideHits() {
  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#858796';

  function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
      };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }

  // Area Chart Example
  var ctx = document.getElementById("myAreaChart");
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      // labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
      labels: ["Jan", "Feb", "Mar", "Apr", "Mai"],
      datasets: [{
        label: "Antall sidetreff",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        // data: [4, 10, 3, 27, 137, , , , , , , ],
        data: [4, 10, 3, 27, 204],
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return '' + number_format(value);
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
          }
        }
      }
    }
  });

}

function kick() {
  // let name = firebase.auth().currentUser.displayName;
  let name = document.getElementById('username').innerHTML;

  if (name == 'Eivind' || name == 'Gudmundsen' || name == 'JJ') {
    console.log('Accepted');
  } else {
    signOut();
  }
}

function listUsers() {
  var database = firebase.database().ref().child('bruker').orderByKey();
  database.once('value', function(snapshot) {
    if (snapshot.exists()) {
      var content = '';
      snapshot.forEach(function(data) {
        var val = data.val();
        var imgUrlTemp = val.username;
        var imgUrl = imgUrlTemp.toLowerCase();


        content += '<li class="media">';
        content += '<div class="media-left">';
        content += '<img class="img-circle" src="https://aarvikgudmundsen.no/fisk/uploads/profilbilde' + imgUrl + '.png" id="myImg" alt="profilbilde">';
        content += '</div>';
        content += '<div class="media-body">';
        content += '<h4 class="media-heading">' + val.username + '</h4>';
        content += '<span>' + val.bio + '</span>';
        content += '<p>' + val.numFish + ' fisker totalt</p>';
        content += '<p> <strong>Rank:</strong> ' + val.rank + '</p>';
        content += '</div>';
        content += '</li>';
        content += '<hr>';

      });
      $('#brukerUiList').append(content);


    }
    $('img').on("error", function() {
      $(this).attr('src', 'https://aarvikgudmundsen.no/fisk/uploads/fishing-rod.png');
    });
  });

}



function listNumberOfSpecies() {
  numberOfTrouts();
  numberOfPollocks();
  numberOfMackerels();
  numberOfCods();
  numberOfPerches();

}


function signOut() {
  firebase.auth().signOut();
}

function generate() {
  numberOfFishAndUsers();
  pieChart();
  barchart();
  sideHits();
  printNumberOfSpecies();
  listUsers();
  speciesBarChart();
}
