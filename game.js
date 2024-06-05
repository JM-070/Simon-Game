var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

$(document).keypress(function (){

  if(!started){
    $('h1').text("Level 0");
    nextSequence();
    started = true;
  }


});

function nextSequence(){
  level++;
  userClickedPattern = [];
  $('h1').text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour +".mp3");
  audio.play();
}

function playSound(name){
  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");

  setTimeout(function(){
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("success");
  }
  else{
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $('h1').text("Game Over, Press Any Key to Restart");

    startOver();
  }

  if(gamePattern.length === userClickedPattern.length){
    setTimeout(function (){
      nextSequence();
      userClickedPattern = [];
    }, 1000);
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
