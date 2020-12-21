// DOM Elements
let placementsHTML = document.querySelector('.placements')
let leaderboardInfoHTML = document.querySelector('.leaderboard-info')

// Info text
leaderboardInfoHTML.innerHTML = 'Next prize for 1st place on Day ' + localStorage.getItem('leaderboardPrizeDay') 
+ '<br />' + 'Prize: <span class="leaderboard-prize">$' + localStorage.getItem('leaderboardPrize') + '</span>'

// Load sorted teams
let sortedTeams = JSON.parse(localStorage.getItem('teamsSorted'))

// Teams text
let i = 0
for (i = 0; i < sortedTeams.length; i++) {
    placementsHTML.innerHTML = placementsHTML.innerHTML + '#' + sortedTeams[i].place + ' | ' + sortedTeams[i].name 
    + '(' + sortedTeams[i].ranking + ')' + ' | ' + '<span class="team-points">' + sortedTeams[i].pointsCurrent 
    + ' Points' + '</span>' + '<br />'
}