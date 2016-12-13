$(document).ready(function(){
  var config = {
    apiKey: "AIzaSyCSi4h4h06-jrgJpnLPw4au58NSZJh9h7k",
    authDomain: "multi-rps-11a5c.firebaseapp.com",
    databaseURL: "https://multi-rps-11a5c.firebaseio.com",
    storageBucket: "multi-rps-11a5c.appspot.com",
    messagingSenderId: "1042947684193"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Link to Firebase Database for viewer tracking
  // database reference for us
  var connectionsRef = database.ref("/connections");
  // database reference for everyone
  var connectedRef = database.ref(".info/connected");




}); // end of document ready
