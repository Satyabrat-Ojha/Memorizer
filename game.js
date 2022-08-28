var level = 0, start = false;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

// Starting with level 0 and nextSequence 
$(document).keypress(function () {
    if (!start) {
        console.log("start")
        start = true
        level = 0
        $("#level-title").text("Level " + level)
        nextSequence()
    }
})

// incrementing level, initialize user, choose, push, animate
function nextSequence() {
    console.log("nextSequence")
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// push and check
$(".btn").click(function () {
    console.log("Click")
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

// Checking current ans : if correct animate-play (& if complete, next in 1 sec) , if not gameOver
function checkAnswer(currentLevel) {
    console.log("check")
    if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
        console.log("fail")
        gameOver();
    }
    else {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length)
            setTimeout(nextSequence, 1000);
    }
}

// Game Over Funtion : text,sound,bg,initialize
function gameOver() {
    console.log("gameOver")
    $("#" + "level-title").text("Game Over, Press Any Key to Restart")
    gamePattern = [];
    userClickedPattern = [];
    start = false
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

// animating press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// sound shorthand
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}






