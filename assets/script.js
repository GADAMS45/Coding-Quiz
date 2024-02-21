var time = document.getElementById("time")
var startscreen = document.getElementById("start-screen")
var startbutton = document.getElementById("startBtn")
var questions = document.getElementById("questions")
var questiontitle = document.getElementById("question-title")
var choices = document.getElementById("choices")
var endscreen = document.getElementById("end-screen")
var finalscore = document.getElementById("final-score")
var initials = document.getElementById("initials")
var submit = document.getElementById("submit")
var scoredata = document.getElementById("score-data")
var timestate;
var timeleft = 60
var questionindex = 0


var highscoreData = JSON.parse(localStorage.getItem("highscores")) || []
//function that starts timer hides start screen and unhides questions//
function startquiz() {
  startscreen.setAttribute("class", "hide")
  questions.removeAttribute("class", "hide")
  timestate = setInterval(function () {
    timeleft = timeleft - 1
    time.textContent = timeleft
    if (timeleft <= 0) {
      clearInterval(timestate)
    }
  }, 1000)
  showquestions()
}
function showquestions() {
  var currentQuestion = quizQuestions[questionindex];

  // update title

  questiontitle.textContent = currentQuestion.title;

  // clear out any old question choices
  choices.innerHTML = '';

  // loop over choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // create new button for each choice

    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', currentQuestion.choices[i]);

    choiceNode.textContent = currentQuestion.choices[i];
    choiceNode.onclick = checkanswer
    // display on the page
    choices.appendChild(choiceNode);
  }



}

function endQuiz() {
  // stop the timer
  clearInterval(timestate)

  questions.classList.add("hide")
  endscreen.classList.remove("hide")

  finalscore.textContent = timeleft
}

function checkanswer() {
  if (this.value === quizQuestions[questionindex].answer) {
    console.log("correct")
  } else {
    console.log("incorrect")
    timeleft-=10;
  }
  questionindex = questionindex + 1
  //call displayquestion for next question index

  if (questionindex >= quizQuestions.length) {
    endQuiz()
  } else {
    showquestions()
  }
}
startbutton.onclick = startquiz


var quizQuestions = [
  {
    title: "What are booleans?:",
    choices: ["fooleans", "is a funny word", "a data type", "water breaks"],
    answer: "a data type"
  },
  {
    title: "A navigation bar needs HTML as a base.",
    choices: ["True", "False"],
    answer: "True"
  },
  {
    title: "What does CSS stand for?:",
    choices: ["Cascade Style Sheets", "Costing Sick Sheet", "Cows Stink Sheets", "Calander Style Sheets"],
    answer: "Cascade Style Sheets"
  },
  {
    title: "What is a NAV bar?:",
    choices: ["it contains a list of links", "pythagorean theorem", "java", "java with the script"],
    answer: "it contains a list of links"
  },
  {
    title: "CSS is used to..:",
    choices: ["wash cars", "Style a web page", "form opinions", "political views"],
    answer: "Style a web page"
  },
]

function saveSubmit() {
  var score = timeleft;
  var name = initials.value;


  var data = {
    score,
    name
  }

  highscoreData.push(data)

  localStorage.setItem("highscores", JSON.stringify(highscoreData))

  window.location.reload();
}

submit.addEventListener("click", saveSubmit)


function loadData () {

  for(i = 0; i < highscoreData.length; i++) {
    var newLi = document.createElement("li");
    newLi.textContent = highscoreData[i].name + " - " + highscoreData[i].score
  
    scoredata.append(newLi)
  }
  
}



loadData();

