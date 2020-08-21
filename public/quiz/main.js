const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const conterHtml = document.getElementById("counter");
const scoreHtml = document.getElementById("score");

const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 20;

let questions = [];

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  loader.classList.add("hidden");
  game.classList.remove("hidden");
};

getNewQuestion = () => {
  if(questionCounter == questions.length || questionCounter == MAX_QUESTIONS){
      window.location.assign("./result.html");
      return;
  }
  

  questionCounter++;
  conterHtml.innerText = `${questionCounter}/${Math.min(questions.length, MAX_QUESTIONS)}`
  
  const questionindex = Math.floor(Math.random()*availableQuestions.length);
  currentQuestion = availableQuestions[questionindex];
  question.innerText = currentQuestion.question;

  choices.forEach( choice => {
      const number = choice.dataset['number']; 
      choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionindex, 1);

  acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        acceptingAnswers = false;
        const selectChoice = e.target;
        const selectAnswer = selectChoice.dataset["number"];
        let classToApply = 'incorrect';
        if(selectAnswer == currentQuestion.answer) {
            classToApply = 'correct';
            console.log(classToApply);
            score += CORRECT_BONUS;
            scoreHtml.innerHTML = `${score}`;
            localStorage.setItem("score", score);
        }
        selectChoice.parentElement.classList.add(classToApply);

        setTimeout(( ) => {
            selectChoice.parentElement.classList.remove(classToApply);
            game.classList.add("hidden");
            loader.classList.remove("hidden");
            setTimeout(()=>{
              getNewQuestion();
              loader.classList.add("hidden");
              game.classList.remove("hidden");
            } ,300);
            
        }, 1000);
        
    });
});

fetch("https://opentdb.com/api.php?amount=20&category=18").then(res => {
    return res.json();
}).then(lq => {
    //console.log(lq.results);
    //questions = lq;
    lq.results.forEach(q => {
        let foramtedQuestion = {
          question : q.question,
          answer: Math.floor(Math.random()*3) + 1
        };

        let qlist = [...q.incorrect_answers];
        qlist.splice(foramtedQuestion.answer-1, 0, q.correct_answer);
        qlist.forEach((ch, index) => {
            foramtedQuestion[`choice${index+1}`] = ch; 
        });
        if(qlist.length == 4)
          questions.push(foramtedQuestion);
    });
    console.log(questions);
    startGame();
}); 



