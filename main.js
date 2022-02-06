const startBtn = document.getElementById("startBtn")
const exitBtn = document.getElementById("exitBtn")
const continueBtn = document.getElementById("continueBtn")
const rules = document.getElementById("rules")
const quiz = document.getElementById("quiz")
const timerCont = document.getElementById("timerCont")


let timer = 15;


startBtn.addEventListener("click", startQuiz)
exitBtn.addEventListener("click", exitQuiz)
continueBtn.addEventListener("click", continueQuiz)


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

function startTimer() {
    const timerInterval = setInterval(() => {
        timer--;
        timerCont.innerText = timer;
        
        if (timer === 0) {
            clearInterval(timerInterval)
        }
    }, 1000);
}