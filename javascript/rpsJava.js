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

  var dbPlayerNames = database.ref("/names");
  var player1ref = database.ref("/names/player1");
  var player2ref = database.ref("/names/player2");

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
  var p1choice;
  var p2choice;
  var p1name;
  var p2name;

  // On click Player 1 Submit buttons
  $("#p1SubmitButton").on("click", function(e){
    p1name = $("#p1NameInput").val();

    // console.log(e);
    console.log(p1name);
    var timestamp1 = Date.now();


    player1ref.set({
      player1Name: p1name,
      player1Choice: "",
      player1ID: timestamp1
    });

    // $("#p1NameHide").hide();


  });

  $("#p2SubmitButton").on("click", function(e){
    p2name = $("#p2NameInput").val().trim();
    // console.log(e);
    console.log(p2name);
    var timestamp2 = Date.now();

    player2ref.set({
      player2Name: p2name,
      player2Choice: "",
      player2ID: timestamp2
    });
    $("#p2NameHide").hide();

  });


player1ref.on("value", function(snap){
  var snapshot = snap.val();
  var new1Name = snapshot.player1Name;

  console.log(snapshot);
  $(".fbp1Name").html(new1Name);
  // HIDE NAME INPUT BOX IF NAME DEFINED
  if(new1Name !== undefined){
    $("#p1NameHide").hide();
  }

});
player2ref.on("value", function(snap){
  var snapshot = snap.val();
  var new2Name = snapshot.player2Name;
  console.log(snapshot);

  $(".fbp2Name").html(new2Name);
  if(new2Name !== undefined){
    $("#p2NameHide").hide();
  }
});



// Generate Rock,Paper,Scissor buttons
function generateChoices(){
  $("#player1choices").empty();
  $("#player2choices").empty();
  $("#resultsArea").empty();
  for(var x = 0; x < choices.length; x++){
    var choice1Button = $("<button>");
    choice1Button.attr("data-choice1", choices[x]);
    choice1Button.text(choices[x]);
    choice1Button.addClass("choiceButton");
    choice1Button.addClass("btn btn-primary");
    $("#player1choices").append(choice1Button);

  }
  for(var i = 0; i < choices.length; i++){
    var choice2Button = $("<button>");
    choice2Button.attr("data-choice2", choices[i]);
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

$(document).on("click", ".choiceButton", function(){
  console.log($(this).data("choice1"));
  // PLAYER 1 CHOICE LOGIC
  if($(this).data("choice1") === "Rock"){
    $("#player1choices").empty();
    $("#player1choices").html("<h3>Rock</h3>");
    $("#player1choices").attr("data-chosen", true);
    p1choice = "rock";
    checkPlayerChoices();

  }

  else if($(this).data("choice1") === "Paper"){
    $("#player1choices").empty();
    $("#player1choices").html("<h3>Paper</h3>");
    $("#player1choices").attr("data-chosen", true);
    p1choice = "paper";
    checkPlayerChoices();

  }
  else if($(this).data("choice1") === "Scissors"){
    $("#player1choices").empty();
    $("#player1choices").html("<h3>Scissors</h3>");
    $("#player1choices").attr("data-chosen", true);
    p1choice = "scissors";
    checkPlayerChoices();
  }

  // PLAYER 2 CHOICE LOGIC
  if($(this).data("choice2") === "Rock"){
    $("#player2choices").empty();
    $("#player2choices").html("<h3>Rock</h3>");
    $("#player2choices").attr("data-chosen", true);
    p2choice = "rock";
    checkPlayerChoices();

  }

  else if($(this).data("choice2") === "Paper"){
    $("#player2choices").empty();
    $("#player2choices").html("<h3>Paper</h3>");
    $("#player2choices").attr("data-chosen", true);
    p2choice = "paper";
    checkPlayerChoices();

  }
  else if($(this).data("choice2") === "Scissors"){
    $("#player2choices").empty();
    $("#player2choices").html("<h3>Scissors</h3>");
    $("#player2choices").attr("data-chosen", true);
    p2choice = "scissors";
    checkPlayerChoices();
  }

  // console.log($(this).data("choice2"));

});

function checkPlayerChoices(){
  if($("#player1choices").data("chosen") === true && $("#player2choices").data("chosen") === true){
    console.log("test1");
    if (p1choice === "rock" && p2choice === "rock"){
      $("#resultsArea").html("<h3>TIE!</h3>");
      updateScores();
      nextGame();
    }
    else if (p1choice === "rock" && p2choice === "paper"){
      $("#resultsArea").html("<h3>Player1 Wins!</h3>");
      p1wins++;
      p2loss++;
      updateScores();
      nextGame();
    }
    else if (p1choice === "rock" && p2choice === "scissors"){
      $("#resultsArea").html("<h3>Player2 Wins!</h3>");
      p2wins++;
      p1loss++;
      updateScores();
      nextGame();
    }
    else if (p1choice === "paper" && p2choice === "paper"){
      $("#resultsArea").html("<h3>TIE!</h3>");
      updateScores();
      nextGame();
    }
    else if (p1choice === "paper" && p2choice === "scissors"){
      $("#resultsArea").html("<h3>Player2 Wins!</h3>");
      p2wins++;
      p1loss++;
      updateScores();
      nextGame();
    }
    else if (p1choice === "paper" && p2choice === "rock"){
      $("#resultsArea").html("<h3>Player1 Wins!</h3>");
      p1wins++;
      p2loss++;
      updateScores();
      nextGame();
    }
    else if (p1choice === "scissors" && p2choice === "scissors"){
      $("#resultsArea").html("<h3>TIE!</h3>");
      updateScores();
      nextGame();
    }
    else if (p1choice === "scissors" && p2choice === "rock"){
      $("#resultsArea").html("<h3>Player2 Wins!</h3>");
      p2wins++;
      p1loss++;
      updateScores();
      nextGame();
    }
    else if (p1choice === "scissors" && p2choice === "paper"){
      $("#resultsArea").html("<h3>Player1 Wins!</h3>");
      p1wins++;
      p2loss++;
      updateScores();
      nextGame();
    }
  }
}

function nextGame(){
  setTimeout(generateChoices, 3000);
  p1choice = "";
  p2choice = "";
}







}); // end of document ready
