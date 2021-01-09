// Calculate players' overall ranking & place them in the dom
let playersRosterHTML = document.querySelector('.players-roster')

var i = 0
for (i = 0; i < players.length; i++) {
    // Place players on HTML
    playersRosterHTML.innerHTML = playersRosterHTML.innerHTML 
    + '<span class="player-name">' + players[i].name + '</span>'
    + '<br />' + '| ' + 'Skill: ' + players[i].skill + '<br />' + '| ' 
    + 'Co-op: ' + players[i].coop + '<br />' + '| ' 
    + 'Overall: ' + players[i].overall + '<br />'
}

// Show team name and stats
let teamNameRosterHTML = document.querySelector('.team-name')
teamNameRosterHTML.innerHTML = teams[0].name

let rankingRosterHTML = document.querySelector('.ranking')
rankingRosterHTML.innerHTML = teams[0].ranking

let rankingBonusRosterHTML = document.querySelector('.ranking-bonus')
rankingBonusRosterHTML.innerHTML = '(+' + teams[0].overallTotal + ')'

let timesWonHTML = document.querySelector('.times-won')
timesWonHTML.innerHTML = 'Times Won: ' + teams[0].timesWon

let timesLostHTML = document.querySelector('.times-lost')
timesLostHTML.innerHTML = 'Times Lost: ' + teams[0].timesLost

let winLossRatioHTML = document.querySelector('.win-loss-ratio')
let winLossRatio = teams[0].timesWon / teams[0].timesLost

// Avoid impossible divisions
if (teams[0].timesLost == 0 && teams[0].timesWon != 0) {
    winLossRatioHTML.innerHTML = 'W/L Ratio: ' + teams[0].timesWon.toFixed(1)
} else if (teams[0].timesLost != 0 && teams[0].timesWon == 0) {
    winLossRatioHTML.innerHTML = 'W/L Ratio: ' + teams[0].timesLost.toFixed(1) 
} else if (teams[0].timesLost == 0 && teams[0].timesWon == 0) {
    winLossRatioHTML.innerHTML = 'W/L Ratio: ' + '0.0'
} 
else {
    winLossRatioHTML.innerHTML = 'W/L Ratio: ' + winLossRatio.toFixed(1)
}