function submitQuiz(){

    const correctAnswers={
        q1: "Paris",
        q2: "Mercure",   
        q3: "Jupiter"
    }

    const form =document.getElementById("quiz-form")
    let score=0

   for(const question in correctAnswers){
    const userAnswer = form[question].value
    if(userAnswer === correctAnswers[question]){
        score++
      }
   }

   const resultDiv=document.getElementById("result")

    resultDiv.innerHTML=`Votre score est de ${score} `

    if (score===3){
        resultDiv.innerHTML +=`<br> Bravo! Vous avez tout bon !`
    }else if (score===2){
        resultDiv.innerHTML += `<br> Bien joué ! Vous avez 2 bonnes réponses.`
    }else {
        resultDiv.innerHTML += `<br> vous pouvez mieux faire!`
    }

}