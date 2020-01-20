buttonColours = ["red", "blue", "green", "yellow"];
console.log(buttonColours);

var gamePattern = [];
var started = false;
var userClickedPattern = [];
var level = 0;
$(".btn").on("click", function() {
  let id = this.id;
  userClickedPattern.push(id);
  playSound(id);
  animatePress(id);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(document).on("keypress", function(event) {
  if (!started) {
    nextSeqence();
    $("h1").text("Level " + level);
    started = true;
  }
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSeqence();
      }, 2000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
   $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
}
}

 function startOver(){
   level = 0;
   gamePattern=[];
   started=false;
   userClickedPattern=[];
 }

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function nextSeqence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var newRandomno = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[newRandomno];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
