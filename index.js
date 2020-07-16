var buttonColours = ["red","blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var isStarted = false;

var level = 0;

$("#red").click(function(){
    handeler(this);
})

$("#blue").click(function(){
    handeler(this);
})

$("#green").click(function(){
    handeler(this);
})

$("#yellow").click(function(){
    handeler(this);
})

$(document).keypress(function (e) { 
    if(isStarted==false)
    {
        nextSequence();
        isStarted=true;
    }
});

function handeler(e)
{
    if(isStarted==true)
    {
        var userChosenColour=e.id;
        animatePress(userChosenColour);
        playSound(userChosenColour)
        userClickedPattern.push(userChosenColour);
        var result = checkLevel(userClickedPattern.length);
        if(userClickedPattern.length==gamePattern.length && result==true)
        {
            setTimeout(function(){
                nextSequence();
                userClickedPattern=[];
            }, 1000);
        }
    }
}

function nextSequence()
{
    level++;
    $("h1#level-title"). text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name)
{
    var randomSound = new Audio(name+".mp3");
    randomSound.play();
}

function animatePress(name)
{
    $("div#"+name).addClass("pressed");

    setTimeout(function(){
        $("div#"+name).removeClass("pressed");
    },100);
}

function checkLevel(currentlevel)
{
    for(var i=0;i<currentlevel;i++)
    {
        if(userClickedPattern[i]!=gamePattern[i])
        {
            console.log("wrong");
            GameOver();
            return false;
        }
    }
    return true;
}

function GameOver()
{
    playSound("wrong");
    $("h1#level-title").text("Game Over Press Any Key To Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    isStarted = false;
    level=0;
    gamePattern=[];
    userClickedPattern=[];

    $(document).keypress(function (e) { 
        if(isStarted==false)
        {
            nextSequence();
            isStarted=true;
        }
    });

}