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