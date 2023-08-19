var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = this.id.toString();//$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel)
{
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over Simon, Go Back!");
        startOver();
    }
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var Rnum = Math.floor((Math.random()*4));
    var randomChosenColor = buttonColours[Rnum];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}