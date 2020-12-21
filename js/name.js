// Allow names that use at least 4 characters
var teamNameFieldHTML = document.querySelector(".team-name-field")

function nameCheck(){
    if (teamNameFieldHTML.value.length >= 4) {
        // Make the first team be the player's team 
        //by assigning the desired name (fix capitalization, too)
        teams[0].name = teamNameFieldHTML.value

        // [INITIAL LOCAL STORAGE] Stores everything locally
        localStorage.setItem('teams',  JSON.stringify(teams))
        localStorage.setItem('teamsSorted',  JSON.stringify(teams))
        localStorage.setItem('players',  JSON.stringify(players))
        localStorage.setItem('events', JSON.stringify(events))
        localStorage.setItem('dayCurrent', dayCurrent)
        localStorage.setItem('leaderboardPrizeDay', leaderboardPrizeDay)
        localStorage.setItem('leaderboardPrize', leaderboardPrize)
        localStorage.setItem('matchDay', matchDay)
        localStorage.setItem('matchDayNumber', matchDayNumber)
        localStorage.setItem('matchWinner', 'none')
        localStorage.setItem('whatDidYouDo', whatDidYouDo)
        localStorage.setItem('eventIndex', 0)
        localStorage.setItem('eventResult', 0) // 1=good, 2=bad, 3=nothing

        // Calculate the INITIAL player overall total every time a new day begins (THIS HAPPENS ON results.js)
        players = JSON.parse(localStorage.getItem('players', players))
        let overallTotal = 0
        for (i = 0; i < players.length; i++) {
            players[i].overall = Math.floor((players[i].skill + players[i].coop) / 2)
            overallTotal += players[i].overall
        }
        console.log(overallTotal)
        teams[0].overallTotal = overallTotal
        localStorage.setItem('players', JSON.stringify(players))
        localStorage.setItem('teams', JSON.stringify(teams))

        // Go to win conditions
        redirectToWinConditions()
    } else {
        alert("Names need to be at least 4 characters long!")
    }
}
