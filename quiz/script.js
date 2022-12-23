const welcomeBtn = document.querySelector(".next-btn")
const startBtn = document.querySelector("#start-quiz-btn")
const firstSlide = document.querySelector(".welcome-box")
const secondSlide = document.querySelector(".user-details")
const thirdSlide = document.querySelector(".quiz-section")
const category = document.querySelector('#category-id')
const questionNumber = document.querySelector('#question-number')
const diffiultyChoices = document.querySelector('#diffcult-choices')
const currentQuestion = document.querySelector('.current-question')
const option = document.querySelectorAll('.answer-container')
const nextQuestionBtn = document.querySelector('.next-question-btn')
const TotalUserQuestion = document.querySelector('#question-number')
const questionType = document.querySelector('#user-type') 
const currentQuestionNum = document.querySelectorAll('#current-question-num')
const questionAnimation = document.querySelector('.total-question-animation-box')
const prograssBar =   document.querySelector('#prograss-bar')
const countDownHour = document.querySelector('#hour-time')
const countDownMinute = document.querySelector('#minute-time')
const warningBtn = document.querySelector('.warning-btn')
const warningPopup = document.querySelector('.warning')
const resultBox = document.querySelector('.result') 
const popup = document.querySelector('.endgame')
const HourValue = document.querySelector('.hour-value')
const MinuteValue = document.querySelector('.minute-value')
const restartQuizBtn = document.querySelector('.play-again-btn')
let Correct_ans = document.querySelector('.correct-answer')
const blurBg = document.querySelector('.container')
const Username = document.querySelector('.name')
const rulesBox = document.querySelector('.rules')
let totalPoints = document.querySelector('.score')

let i=0
let v=0


 

// document.querySelector('.user-details').scrollIntoView()

rulesBox.style.display = 'flex'
// removing rules box

const rules = document.querySelector('.rules-btn')

rules.addEventListener('click', () => {
    document.querySelector('.rules').classList.add('animate-rules')
   
   rules.disabled = true
   rules.style.cursor = 'none'
   
   setTimeout(() =>{
    firstSlide.classList.add('fade-In-WelcomBox')

  }, 1000)
 
  setTimeout(() => {
   document.querySelector('#Title').classList.add('animate-heading')
  }, 1000)

  setTimeout(() => {
  document.querySelector('#description').classList.add('description-animate')
  document.querySelector('#next-button').classList.add('next-btn-animate')
  }, 3000)
})


// slider animations

welcomeBtn.addEventListener('click', () => {
    firstSlide.classList.add('sliderclosing')
    secondSlide.classList.add('activeslider')
})

  



// resetting values of input after reload

window.addEventListener('load', () => {
    Username.value = ''
})


restartQuizBtn.addEventListener('click', () => {
  window.location.reload()
})



// evente listener

startBtn.addEventListener('click', startQuiz)


function startQuiz() {

  // setting player name on quiz field

    const playerName = document.querySelector('.player-name_text')
    
    playerName.innerText = Username.value

    if(Username.value == ''){
      
      warningPopup.style.display = 'block'
      blurBg.classList.add('dark-bg')
      startBtn.style.cursor = 'default'

      Username.disabled = 'true'
      category.disabled = 'true'
      diffiultyChoices.disabled = 'true'
      questionType.disabled = 'true'
      questionNumber.disabled = 'true'
      countDownMinute.disabled = 'true'
      questionType.disabled = 'true'

    }else {

      setTimeout(() => {
        CountDownTime()
      }, 4000)
      
     startBtn.classList.add('active')
      window.setTimeout(() => {
        secondSlide.classList.remove('activeslider')
        secondSlide.classList.add('sliderclosing')
        thirdSlide.classList.add('activeslider')
        question()
        
      }, 1000)
    }
  }

  warningBtn.addEventListener('click', () => {
    warningPopup.style.display = 'none'
    startBtn.style.cursor = 'pointer'
    blurBg.classList.remove('dark-bg')
    
    Username.removeAttribute('disabled')
      category.removeAttribute('disabled')
      diffiultyChoices.removeAttribute('disabled')
      questionType.removeAttribute('disabled')
      questionNumber.removeAttribute('disabled')
      countDownMinute.removeAttribute('disabled')
  })



nextQuestionBtn.disabled = true

nextQuestionBtn.addEventListener('click', () => {
            question()
    })
  

function question(){

    const Totalquestion = parseInt(TotalUserQuestion.options[TotalUserQuestion.selectedIndex].text)
    

// increment the current question number

      console.log(Totalquestion)
      setResult(Totalquestion)

      currentQuestionNum[0].innerText = ++i
      currentQuestionNum[1].innerText = ++v
     
 // end quiz once player attempted all questions  

if(currentQuestionNum[0].innerText <= Totalquestion){

  const d = ( currentQuestionNum[0].innerText / Totalquestion) * 100
  prograssBar.style.width = d + '%'
  
    const categorySelect = category.options[category.selectedIndex].value
        const choice =  diffiultyChoices.options[diffiultyChoices.selectedIndex].text
        let QuesType = questionType.options[questionType.selectedIndex].text
       
      console.log(QuesType)
       
        const totalQuestion = document.querySelector('#total-question-stats')
        
        totalQuestion.innerText = Totalquestion
       
        if(QuesType == 'True / False'){
               
             QuesType = "boolean"

          }

       fetchquestion(categorySelect, choice, QuesType)
       
    }else{
      
      currentQuestionNum[0].innerText = Totalquestion 
      currentQuestionNum[1].innerText = Totalquestion

      setTimeout(() => {
          endGame()

         
      }, 500)
      
   }

}


// fetching the data from the api

 function fetchquestion(category, choice, UserQuestionType){

  fetch(`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${choice}&type=${UserQuestionType}&decode=url3986`, {
      method: 'GET',
      header: {
      'content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(response => {
      
      setQuestion(response)
    
    })

  }

  
// set question on quiz board

function setQuestion(response){

   option.forEach(ele => {
    ele.classList.add('ans-container')
   })

     let res = response

     let ans = response.results[0].question

    const D =  new DOMParser().parseFromString(ans, "text/html")
     
   console.log(D.documentElement.textContent)
    
    currentQuestion.innerText = D.documentElement.textContent


 // If user chose True/Flase type question then show all 2 boxes for options 

    if(response.results[0].type == "boolean"){

       console.log(res)

      let shuffle = [ 0, 1]
      shuffle.sort(() => Math.random() - 0.5)

      option[shuffle[0]].innerText = res.results[0].correct_answer
      option[shuffle[1]].innerText = res.results[0].incorrect_answers[0]

      document.querySelector('#hideAnswer3').style.display = 'none'
      document.querySelector('#hideAnswer4').style.display = 'none'


     
    }else{

  
      // If user chose MCQ type question then show all 4 boxes for options 

        let shuffle = [ 0, 1, 2, 3]
        shuffle.sort(() => Math.random() - 0.5)

        const decodeAns = new DOMParser().parseFromString(res.results[0].correct_answer, "text/html")
        const decodeInCorrectAns1 = new DOMParser().parseFromString(res.results[0].incorrect_answers[0], "text/html")
        const decodeInCorrectAns2 = new DOMParser().parseFromString(res.results[0].incorrect_answers[1], "text/html")
        const decodeInCorrectAns3 = new DOMParser().parseFromString(res.results[0].incorrect_answers[2], "text/html")
        
        option[shuffle[0]].innerText = decodeAns.documentElement.textContent
        option[shuffle[1]].innerText = decodeInCorrectAns1.documentElement.textContent
        option[shuffle[2]].innerText = decodeInCorrectAns2.documentElement.textContent
        option[shuffle[3]].innerText = decodeInCorrectAns3.documentElement.textContent

     }
    
    selectOption(res)
    
}



// end game popup message after quiz end 

 function endGame() {

      nextQuestionBtn.disabled = true
      nextQuestionBtn.style.cursor = 'default'
      thirdSlide.classList.add('blur-bg')
      popup.classList.add('show-popup')

}


//  select option once they are available

function selectOption(res){
   
    // Get the all options

    var option1 = document.getElementById("optionA");
    var option2 = document.getElementById("optionB");
    var option3 = document.getElementById("optionC");
    var option4 = document.getElementById("optionD");
  
    // Add an event listener to every option that prevents the user from selecting another option once they picked one option

      option1.addEventListener("click", function() {
      option2.disabled = true;
      option3.disabled = true;
      option4.disabled = true;
      
      option.forEach(ele => {
        ele.classList.remove('ans-container')
        ele.style.cursor = 'default'
      })

      nextQuestionBtn.disabled = false

      if(option1.innerText == res.results[0].correct_answer){
        option1.classList.add('right')
         Correct_ans.innerText++
         totalPoints.innerText++
        totalPoints.innerText++
      }else{
       option1.classList.add('wrong')
      }

    }, {once : true});

    option2.addEventListener("click", function() {
      option1.disabled = true;
      option3.disabled = true;
      option4.disabled = true;

      option.forEach(ele => {
        ele.classList.remove('ans-container')
        ele.style.cursor = 'default'
      })


      nextQuestionBtn.disabled = false

      if(option2.innerText == res.results[0].correct_answer){
        option2.classList.add('right')
        Correct_ans.innerText++
        totalPoints.innerText++
        totalPoints.innerText++
      }else{
       option2.classList.add('wrong')
      }
    }, {once : true});

    option3.addEventListener("click", function() {
      option1.disabled = true;
      option2.disabled = true;
      option4.disabled = true;

      option.forEach(ele => {
        ele.classList.remove('ans-container')
        ele.style.cursor = 'default'
      })


      nextQuestionBtn.disabled = false

      if(option3.innerText == res.results[0].correct_answer){
        option3.classList.add('right')
        Correct_ans.innerText++
        totalPoints.innerText++
        totalPoints.innerText++
      }else{
       option3.classList.add('wrong')
      }
    }, {once : true});

    option4.addEventListener("click", function() {
      option1.disabled = true;
      option2.disabled = true;
      option3.disabled = true;

      option.forEach(ele => {
        ele.classList.remove('ans-container')
        ele.style.cursor = 'default'
      })


      nextQuestionBtn.disabled = false

      if(option4.innerText == res.results[0].correct_answer){
        option4.classList.add('right')
        Correct_ans.innerText++
        totalPoints.innerText++
        totalPoints.innerText++
      }else{
       option4.classList.add('wrong')
      }
    }, {once : true});
  

    option1.disabled = false;
    option2.disabled = false;
    option3.disabled = false;
    option4.disabled = false;

    option.forEach(ele => {
      ele.style.cursor = 'pointer'
    })
     
// remove answer checking background colors 

    option.forEach(ele => {
      ele.classList.remove('right')
      ele.classList.remove('wrong')
    })
    
    nextQuestionBtn.disabled = true

}


// set result once the quiz end

function setResult(q){

       document.querySelector('.result_UserName').innerText = Username.value
       document.querySelector('.Total-questions').innerText = q
      
       if(Correct_ans.innerText == ''){
            Correct_ans.innerText = 0
            totalPoints.innerText = 0
       }
}





document.querySelector('.btn-show-result').addEventListener('click', showResult)


// show result after quiz end

 function showResult(){

       
         popup.classList.add('endGame-popup-animate')

         setTimeout(() => {
          resultBox.classList.add('show-result')
          rulesBox.style.display = 'none'
          document.querySelector(".endgame").style.zIndex = "-1"
         }, 2000)
         
         thirdSlide.classList.remove('activeslider')
         thirdSlide.classList.add('sliderclosing')
       
  }

  
// count down timer for quiz

function CountDownTime(){

       

        const Userminute = parseInt(countDownMinute.options[countDownMinute.selectedIndex].text)
        console.log(Userminute)
        const H = new Date().setHours(new Date().getHours() + 1)
        const M = new Date().setMinutes(new Date().getMinutes() + Userminute)
            
             setInterval(() => {
                  const currentdate = new Date()
                  const remainingTime = Math.ceil((H - currentdate) / 1000)
                  const R =  Math.ceil((M - currentdate) / 1000)
                
                
                    let minute = Math.floor(R / 60) % 60
                    let seconds = remainingTime % 60
                
                    if(minute == 0 && seconds == 0){

                        return endGame()
                    }else {
                      HourValue.innerText =  `${minute} : ${seconds}`
                    }
                
                    
                }, 1000);

                const timeTken = M - HourValue.innerText
                const d = new Date(timeTken * 1000)
                    
                let minuteTime = d.getMinutes()
                let secondTime = d.getSeconds()

                console.log(minuteTime + secondTime)
               

 }
      

 
           
