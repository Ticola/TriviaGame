// Initial function that creates the START BUTTON and INTIAL SCREEN PAGE
$(document).ready(function () {

    // Create a function that is the intial screen and displays a button to start the quiz
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Press to Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }

    initialScreen();

    // Create a function, generateHTML(), that is triggered by the first button click, and generates the folowing HTML
    $("body").on("click", ".start-button", function (event) {
        generateHTML();
        timerWrapper();
    });

    // Create an event key that is triggered by the answer click and will generate a Win or Loss notification
    $("body").on("click", ".answer", function (event) {
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(theClock);
            generateWin();
        }
        else {
            clearInterval(theClock);
            generateLoss();
        }
    });

    // Create an event key that is used to reset the game and play again
    $("body").on("click", ".reset-button", function (event) {
        resetGame();
    });

});

// Create a function that diaplays the question/answer choices/timer for each question
function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/correct.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
}

// Create a function assigned to keeping a record of how many questions are answered correctly and continue the timer and the game
function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
}

// Create a function assigned to keeping a record of how many questions are answered incorrectly and continue the timer and the game
function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/Wrong.png'>";;
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
}

// Create a function assigned to designating the answer letter to that of the questions array
function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $(".mainArea").html(gameHTML);
}

//Create a function that will continue to cycle throughout the (7) Questions and display the (30 sec) timer and question accordingly
function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

// Create a function that controls the (30 sec) timer for each question and redirect to next question or generate loss due to timeout of game
function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

// Create a function that displays all the players performance and scores (Win, Loss, Questions answered)
function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(gameHTML);
}

// Create a function that will reset the game to its initial settings of 0 and allow the player to play again without refreshing the page
function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateHTML();
    timerWrapper();
}

// Create variables for all parameters of the game
var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Which of these iconic paintings has NOT been stolen?", "Which of these can help significantly when building a campfire?", "Which of these creatures has the fewest hearts?", "Which of these are designed to protect your eyes from the sun?", "What do people typically put in their hair after shampoo?", "A pyramid with a triangular base is called what?", "What word can mean both `documents` and `underwear`?", "In the US, highway speed limits are posted in what unite of measurement?"];
var answerArray = [["The Scream", "Starry Night", "Mona Lisa", "The Last Supper"], ["Call 911", "How to Start a Fire DVD", "Kindling", "Justin Trudeau's smile"], ["Hummingbird", "Octupus", "Catfish", "Squirrel"], ["Sunscreen", "Jorts", "Sunglasses", "Cape"], ["Duck Sauce", "Lotion", "Chocolate Sprinkles", "Conditioner"], ["Dodecahedron", "Tetrahedron", "Paralleogram", "Prismoid"], ["Boxers", "Commando", "Briefs", "Who cares?"], ["No one pays attention", "Miles per hour", "Beats per minute", "Meters per gallon"]];
var imageArray = ["<img class='center-block img-right' src='assets/images/Correct.png'>", "<img class='center-block img-right' src='assets/images/Correct.png'>", "<img class='center-block img-right' src='assets/images/Correct.png'>", "<img class='center-block img-right' src='assets/images/Correct.png'>", "<img class='center-block img-right' src='assets/images/Correct.png'>", "<img class='center-block img-right' src='assets/images/Correct.png'>", "<img class='center-block img-right' src='assets/images/Correct.png'>", "<img class='center-block img-right' src='assets/images/Correct.png'>"];
var correctAnswers = ["B. Starry Night", "C. Kindling", "A. Hummingbird", "C. Sunglasses", "D. Conditioner", "B. Tetrahedron", "C. Briefs", "B. Miles per hour"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;