import questions from "./questions.js"

// All DOM variables are here
const startBtn = document.getElementById("startBtn")
const exitBtn = document.getElementById("exitBtn")
const continueBtn = document.getElementById("continueBtn")
const rules = document.getElementById("rules")
const quiz = document.getElementById("quiz")
const timerCont = document.getElementById("timerCont")
const setQuestion = document.getElementById("setQuestion")
const setOptions = document.getElementsByName("setOptions")
const nextBtn = document.getElementById("nextBtn")
const setQuestionCount = document.getElementById("setQuestionCount")
const setResult = document.getElementById("setResult")
const complete = document.getElementById("complete")
const replayBtn = document.getElementById("replayBtn")
const quitBtn = document.getElementById("quitBtn")
const timeLine = document.getElementById("timeLine")


// All global variables are here
let timer = 15;
let questionCount = 0;
let correctAnswerCount = 0;
let isChooseOption = false;
let timerInterval;
let timeLineInterval;


// Button event listeners
startBtn.addEventListener("click", startQuiz)
exitBtn.addEventListener("click", exitQuiz)
continueBtn.addEventListener("click", continueQuiz)
nextBtn.addEventListener("click", nextQuiz)
replayBtn.addEventListener("click", replayQuiz)
quitBtn.addEventListener("click", quitQuiz)

// Choose of option event listeners
setOptions[0].addEventListener("click", () => chooseOption(setOptions[0]))
setOptions[1].addEventListener("click", () => chooseOption(setOptions[1]))
setOptions[2].addEventListener("click", () => chooseOption(setOptions[2]))
setOptions[3].addEventListener("click", () => chooseOption(setOptions[3]))


function startQuiz() {
    startBtn.classList.add("hide-start-btn")
    rules.classList.add("show-rules")
}

function exitQuiz() {
    startBtn.classList.remove("hide-start-btn")
    rules.classList.remove("show-rules")
}

function continueQuiz() {
    rules.classList.remove("show-rules")
    quiz.classList.add("show-quiz")

    startTimer()
}

function nextQuiz() {
    if (questionCount === questions.length - 1) {
        complete.classList.add("show-complete-cont")
        quiz.classList.remove("show-quiz")
        quizResult()
        return
    }
    
    startTimer()
    questionCount++;
    setQuestionAndOptions()
    resetChooseOption()
    
    nextBtn.classList.remove("show-next-btn")
    isChooseOption = false;
}

function resetChooseOption() {
    setOptions.forEach(item => {
        if (item.classList[1] !== "alert-info") {
            item.classList.remove(item.classList[1])
            item.classList.add("alert-info")
        }
    })
}

function chooseOption(choosedOption) {
    if (isChooseOption) return

    isChooseOption = true;
    clearInterval(timerInterval)
    clearInterval(timeLineInterval)

    // Check correct answer
    if (questions[questionCount].answer === choosedOption.innerText) {
        choosedOption.classList.remove("alert-info")
        choosedOption.classList.add("alert-success")
        correctAnswerCount++;
    } else {
        choosedOption.classList.remove("alert-info")
        choosedOption.classList.add("alert-danger")
        showCorrectAnswer()
    }

    nextBtn.classList.add("show-next-btn")
}

function showCorrectAnswer() {
    setOptions.forEach(item => {
        if (questions[questionCount].answer === item.innerText) {
            item.classList.remove("alert-info")
            item.classList.add("alert-success")
        }
    })
}

function replayQuiz() {
    questionCount = 0;
    correctAnswerCount = 0;

    complete.classList.remove("show-complete-cont")
    quiz.classList.add("show-quiz")

    startTimer()
    resetChooseOption()
    setQuestionAndOptions()
    isChooseOption = false;
}

function quizResult() {
    if (correctAnswerCount > 3) {
        setResult.innerText = `and congrats! 🎉, You got ${correctAnswerCount} out of ${questions.length}`
    } else if (correctAnswerCount > 1) {
        setResult.innerText = `and nice 😎, You got ${correctAnswerCount} out of ${questions.length}`
    } else {
        setResult.innerText = `and sorry 😐, You got ${correctAnswerCount} out of ${questions.length}`
    }
}

function startTimer() {
    let downCunter = timer;
    let timeLineCount = 0;
    
    // This setinterval is for timer 
    timerInterval = setInterval(() => {
        timerCont.innerText = downCunter;
        
        if (downCunter === 0) {
            nextBtn.classList.add("show-next-btn")  
            clearInterval(timerInterval)
            isChooseOption = true;
            showCorrectAnswer()
        }
        
        downCunter--;
    }, 1000);
    
    // This setinterval is for time line 
    timeLineInterval = setInterval(() => {
        timeLine.style.width = `${timeLineCount}px`

        if (timeLineCount === quiz.offsetWidth) {
            clearInterval(timeLineInterval)
        }

        timeLineCount++;
    }, 29);
}

function setQuestionAndOptions() {
    setQuestion.innerText = `${questions[questionCount].numb}. ${questions[questionCount].question}`;
    setOptions[0].innerText = questions[questionCount].options[0];
    setOptions[1].innerText = questions[questionCount].options[1];
    setOptions[2].innerText = questions[questionCount].options[2];
    setOptions[3].innerText = questions[questionCount].options[3];
    setQuestionCount.childNodes[0].innerText = questions[questionCount].numb;
    setQuestionCount.childNodes[2].innerText = questions.length;
}

function quitQuiz() {
    location.reload();
}
