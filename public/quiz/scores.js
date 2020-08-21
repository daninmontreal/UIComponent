const scoreList = document.getElementById("scorelist");
const scoreHistory = JSON.parse(localStorage.getItem("scorehistory")) || [];

scoreList.innerHTML = scoreHistory.map(score => {
    return `<li class="highscore"> ${score.name} : ${score.score} </li>`;
    
}).join("");
