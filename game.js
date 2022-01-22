var buttonColors = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];
var numberOfTimesKeyPressed = 0;
var level = 0;


$(document).keydown(function (event)
{
    numberOfTimesKeyPressed++;
    if(numberOfTimesKeyPressed === 1)
    {
      $(".buttonContainer").css("display","block");
      $(".finalContainer").css("display","none");
      nextSequence();
    }
});

$(".btn").click(function (event)
{
  var userChosenColor = event.currentTarget.id;

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(level);
});

function nextSequence()
{
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#level-title").text("Level"+" "+(++level));

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(soundName)
{
  var soundPlayed = new Audio("sounds/"+soundName+".mp3");
  soundPlayed.play();
}

function animatePress(currentColor)
{
  $("."+currentColor).addClass("pressed");

  setTimeout(function ()
{
  $("."+currentColor).removeClass("pressed");
},100);
}

function checkAnswer(currentLevel)
{
  var index = userClickedPattern.length - 1;

  if(userClickedPattern[index]===gamePattern[index])
  {
    console.log("success");

    if((index+1)===currentLevel)
    {
      setTimeout(function ()
      {
      userClickedPattern = [];
      nextSequence();
      },1000);
    }
  }
  else
  {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function ()
    {
    $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    $(".buttonContainer").css("display","none");
    $(".finalContainer").css("display","block");
    $(".final-score").text("You reached at level "+currentLevel);

    startOver();
  }

}


function startOver()
{
  numberOfTimesKeyPressed = 0;
  gamePattern = [];
  level = 0;

}
