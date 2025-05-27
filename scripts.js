 
 let currentQuestionIndex = 0;
 let score = 0;
 let questions = [];
 let selectedDifficulty = ""
 let timer = 0;
 const timeLimit = 10;
 let timeRemaining = 0;
 
 const url= "https://68a9e217-ba05-41ca-a804-a9dc5b959d11.mock.pstmn.io/api/quiz/allQuestions"

 async function loadQuestions(difficulty)
 {
    console.log("difficulte choisie : " + difficulty)
    

    try{
     
      const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`); 
        }

     const AllQuestions = await response.json()
     console.log("Toutes les questions sont bien la " + AllQuestions)
  
     questions = AllQuestions.filter((q) => q.difficulty === difficulty)
    
      selectedDifficulty = difficulty
      currentQuestionIndex = 0
       
      startQuiz()
      
    } catch (error) {
      
        console.log("Erreur lors du chargement des questions:", error)
    }
      
 }
 
 function startQuiz() 
 {
    document.getElementById("timer-container").style.display = "block";
    document.querySelector(".difficulty-selection").classList.add("hidden")
    document.getElementById("quiz-container").classList.remove("hidden")

    showQuestion()
 }

 function showQuestion() {

    if (currentQuestionIndex < questions.length) {
        console.log(questions)
        const questionData = questions[currentQuestionIndex];
        console.log(" Quetion Data" + questionData)

        const questionContainer = document.getElementById("quiz-container");
        questionContainer.innerHTML = `
         <div class="question">
            <p>${questionData.question}</p>
         </div> 
            <form id="quiz-form"> 
                ${questionData.options.map((option, index) =>
                    `<label class="option">
                        <input type="radio" name ="answer" value="${option}">
                        <span class="custom-radio"></span>
                        ${option}
                     </label>`
                ).join("")}
                    
                    <button type="button" id="next-btn" onClick="submitAnswer()">Suivant</button>
            </form>
        
        `;
        startTimer()
    }else{

        showFinalResult() 
    }
}


function submitAnswer() {
  
    const form = document.getElementById("quiz-form");
    const selectedAnswer = form.answer.value;

    console.log("selected answer :  " + selectedAnswer)

    if (!selectedAnswer) {
        alert("Veuillez sélectionner une réponse.");
        return;
    }
   
 checkAnswer(selectedAnswer)
 currentQuestionIndex++;
 showQuestion();
}

 function checkAnswer(selectedAnswer) {

  const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
        incrementScore()
    } 
}

 function incrementScore() {
    score++;
}

 function showFinalResult(){

    document.getElementById("timer-container").style.display = "none";

     displayResult(score, function() {
             handleMessage(score);
        });   
}

 function updateProgressBar() {

  const progressBar = document.getElementById("progress-bar");
  const progress = (timeRemaining / timeLimit) * 100;

  console.log("progress = " + progress);
  progressBar.style.width = `${progress}%`;

  if (progress <= 30) {
    progressBar.style.backgroundColor = "#e74c3c";
  } else if (progress <= 60) {
    progressBar.style.backgroundColor = "#f5c400";
  } else {
    progressBar.style.backgroundColor = "#0dff00";
  }

}


function stopTimer() {
  clearInterval(timer);
}


function startTimer() {

  timeRemaining = timeLimit;
  updateProgressBar();

  timer = setInterval(() => {
    console.log("temps restant : " + timeRemaining);
    timeRemaining--;
    updateProgressBar();

    if (timeRemaining <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function nextQuestion() {
    
    currentQuestionIndex++;
    showQuestion();  

}

 document.querySelectorAll(".difficulty-btn").forEach((btn) => {

    btn.addEventListener("click", function() {

        const level= btn.getAttribute("data-level")
        loadQuestions(level)

    })

 });


 function showUsername(username) {

  const usernameDisplay=document.getElementById("username-display")
  usernameDisplay.textContent = username

}

 document.addEventListener("DOMContentLoaded", function() {
    
    const storedUsername = localStorage.getItem("username")
    const isAuthenticated = localStorage.getItem("isAuthenticated")
     if (storedUsername && isAuthenticated === "true") {
        showUsername(storedUsername)
        
     }else{ 
         window.location.href = "login.html"
        }
 });

 document.getElementById("logout-btn").addEventListener("click", function() {

    localStorage.setItem("isAuthenticated", false)
    window.location.href = "login.html"

 });


 function displayResult(score , callback ) {

    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = 
    `
        <div id="result">
           <p> Votre score final est de ${score} sur ${questions.length} .</p>
        </div>
      `
    callback(score);
 }    
      
function handleMessage (score)
{

    const resultDiv = document.getElementById("result")
     resultDiv.classList.remove("excellent", "good", "try-again") 
    
    if (score === 3) {
        resultDiv.innerHTML += `<br> Bravo! Vous avez tout bon !`
        resultDiv.classList.add("excellent") 
     } else if (score === 2) {
        resultDiv.innerHTML += `<br> Bien joué ! Vous avez 2 bonnes réponses.`
        resultDiv.classList.add("good") 
    } else {
        resultDiv.innerHTML += `<br> vous pouvez mieux faire!`
        resultDiv.classList.add("try-again") 
    }

}

