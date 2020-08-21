let saveBtn = document.getElementById("saveScoreBtn");
let userName = document.getElementById("username");
let finalScore = document.getElementById("finalScore");

finalScore.innerText = localStorage.getItem("score");
saveBtn.disabled = true;

const scoreHistory = JSON.parse(localStorage.getItem("scorehistory")) || [];

saveBtn.addEventListener("click", e => {
    scoreHistory.push({
        score:localStorage.getItem("score"),
        name: userName.value
    });
    scoreHistory.sort((a, b) => b.score - a.score); 
    localStorage.setItem("scorehistory", JSON.stringify(scoreHistory));
    e.preventDefault();
    window.location.assign("./index.html");
});

userName.addEventListener("keyup", e => {
    saveBtn.disabled = !userName.value;
    
})