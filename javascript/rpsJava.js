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

  // Add ourselves to presence list when online.
  connectedRef.on("value", function(snap){
    if(snap.val()){
      var con = connectionsRef.push(true);
      con.onDisconnect().remove();
    }

  });

  // Number of online users is the number of objects in the presence list.
  connectionsRef.on("value", function(snap){
    $("#infoMessage").html("Number of Players logged in:" + snap.numChildren());
  });

  var choices = ["Rock", "Paper", "Scissors"];
  var p1wins = 0;
  var p1loss = 0;
  var p2wins = 0;
  var p2loss = 0;


// Generate Rock,Paper,Scissor buttons
function generateChoices(){
  for(var x = 0; x < choices.length; x++){
    var choice1Button = $("<button>");
    choice1Button.attr("data-choice", choices[x]);
    choice1Button.text(choices[x]);
    choice1Button.addClass("choiceButton");
    choice1Button.addClass("btn btn-primary");
    $("#player1choices").append(choice1Button);

  }
  for(var i = 0; i < choices.length; i++){
    var choice2Button = $("<button>");
    choice2Button.attr("data-choice", choices[i]);
    choice2Button.text(choices[i]);
    choice2Button.addClass("choiceButton");
    choice2Button.addClass("btn btn-primary");

    $("#player2choices").append(choice2Button);
  }
}
generateChoices();

// update wins and losses
function updateScores(){
  $("#player1score").html("<p>Wins: " + p1wins + "</p>" +
                          "<p>Losses: " + p1loss + "</p>");

  $("#player2score").html("<p>Wins: " + p2wins + "</p>" +
                          "<p>Losses: " + p2loss + "</p>");




}
updateScores();

$(".choiceButton").on("click", function(){
  console.log($(this).data("choice"));
  // console.log($(this).data("choice2"));

});






}); // end of document ready
