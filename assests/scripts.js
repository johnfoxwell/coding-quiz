// Quiz
const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
      "string",
      "boolean",
      "alert",
      "number",
    ],
    correctAnswer: "alert"
  },
  {
    question: "The condition in an if/else statement is enclosed within ____:",
    answers: [
      "quotes",
      "curly brackets",
      "parentheses",
      "square brackets",
    ],
    correctAnswer: "parentheses"
  },
  {
    question: "Array in JavaScript can be used to store ____:",
    answers: [
      "numbers and strings",
      "other arrays",
      "boolean",
      "All of the above",
    ],
    correctAnswer: "All of the above"
  },
  {
    question: "String values must be enclosed within ___ when being assigned to variables",
    answers: [
      "commas",
      "curly brackets",
      "quotes",
      "parentheses",
    ],
    correctAnswer: "quotes"
  },
  {
    question: "A very useful too used during development and debugging for printing content to the debugger is:",
    answers: [
      "Javascript",
      "terminal",
      "for loops",
      "console.log",
    ],
    correctAnswer: "console.log"
  }
]

// Variables
var questionBox = document.querySelector(".intro")
var answerBox = document.querySelector(".answer")
var showResult = document.querySelector(".title")
var catchEl = document.querySelector(".catch")
var postScore = document.querySelector(".post-score")


var timerEl = document.querySelector(".timer");
var startButton = document.querySelector(".start-button");

var secondsLeft;
var timer;
var score;
var currentQuestion = 0;

// Start
function startGame() {
  secondsLeft = 50;
  startButton.disabled = true;
  renderQuestion();
  setTimer();
}

// Timer
function setTimer() {
  timer = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = secondsLeft + " seconds left!";
    
    if(secondsLeft <= 0) {
      clearInterval(timer);
      showScore();
    }    
  }, 1000);
}

// Quiz
function renderQuestion() {
  var question = questions[currentQuestion]
  questionBox.innerHTML = question.question

  answerBox.innerHTML = ""
  for (var i = 0; i < question.answers.length; i++) {
    const answer = question.answers[i]
    const button = document.createElement("button")
    button.innerHTML = answer;

    button.addEventListener("click", function() {
      if (answer != question.correctAnswer) {
        secondsLeft -= 10;
        currentQuestion++;
        catchEl.innerHTML = "wrong"
      } else {
        currentQuestion++;
        catchEl.innerHTML = "right"
      }

      if(currentQuestion < questions.length || secondsLeft === 0) {
        renderQuestion();
      } else {
        showScore();
      }
    });
    answerBox.appendChild(button)
  }
}

// Show score
function showScore() {
  score = secondsLeft;
  postScore.innerHTML = "Send score"
  showResult.innerHTML = "You scored: " + score;
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);


postScore.addEventListener("click", function() {
  localStorage.setItem("highscore", score)
})