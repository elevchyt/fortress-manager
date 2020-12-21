// Results message dom elements
let resultsMessageHTML = document.querySelector('.results-message')
let resultsMessage2HTML = document.querySelector('.results-message-2')

// Calculate the player overall total every time a new day begins
players = JSON.parse(localStorage.getItem('players', players))
let overallTotal = 0
for (i = 0; i < players.length; i++) {
    players[i].overall = Math.floor((players[i].skill + players[i].coop) / 2)
    overallTotal += players[i].overall
}
teams[0].overallTotal = overallTotal
localStorage.setItem('players', JSON.stringify(players))
localStorage.setItem('teams', JSON.stringify(teams))

// Set result-message based on whatDidYouDo
if (whatDidYouDo == 'skip') {
    resultsMessageHTML.innerHTML = 'You have skipped the day!'
} 

else if (whatDidYouDo == 'practiceDexterity') {
    resultsMessageHTML.innerHTML = 'Your team has spent the day practicing!'
    resultsMessage2HTML.innerHTML = '<br />Skill Gained: <br />' 
    + '<span class="skill-gain">' + JSON.parse(localStorage.getItem('skillGain')) + '</span>'
    + '<br /><br />Co-Op Lost: <br />' + '<span class="coop-loss">' 
    + JSON.parse(localStorage.getItem('coopLoss')) + '</span>'
}

else if (whatDidYouDo == 'practiceReview') {
    resultsMessageHTML.innerHTML = 'Your team has spent the day practicing!'
    resultsMessage2HTML.innerHTML = '<br />Skill Lost: <br />' 
    + '<span class="skill-loss">' + JSON.parse(localStorage.getItem('skillLoss')) + '</span>'
    + '<br /><br />Co-Op Gained: <br />' + '<span class="coop-gain">' 
    + JSON.parse(localStorage.getItem('coopGain')) + '</span>'
}

else if (whatDidYouDo == 'practiceCoaching') {
    resultsMessageHTML.innerHTML = 'Your team has spent the day practicing!'
    resultsMessage2HTML.innerHTML = '<br />Skill Lost: <br />' 
    + '<span class="skill-loss">' + JSON.parse(localStorage.getItem('skillLoss')) + '</span>'
    + '<br /><br />Co-Op Gained: <br />' + '<span class="coop-gain">'
    + JSON.parse(localStorage.getItem('coopGain')) + '</span>'
}

else if (whatDidYouDo == 'event') {
    resultsMessageHTML.innerHTML = 'You came across an event and these were the results!'

    if (localStorage.getItem('eventResult') == 1) {
        resultsMessage2HTML.innerHTML = '<br /><i>' + events[localStorage.getItem('eventIndex')].outcomeGood + '</i>'
    } else if (localStorage.getItem('eventResult') == 2) {
        resultsMessage2HTML.innerHTML = '<br /><i>' + events[localStorage.getItem('eventIndex')].outcomeBad + '</i>'
    } else if (localStorage.getItem('eventResult') == 3) {
        resultsMessage2HTML.innerHTML = '<br /><i>' + events[localStorage.getItem('eventIndex')].outcomeNeutral + '</i>'
    }
}

else if (whatDidYouDo == 'match') {
    // Get index of match winner & loser on teams array
    let matchWinner = JSON.parse(localStorage.getItem('matchWinner'))
    let matchLoser = JSON.parse(localStorage.getItem('matchLoser'))

    let matchWinnerIndex
    for (i = 0; i < teams.length; i++) {
        if (matchWinner.id == teams[i].id) {
            matchWinnerIndex = i
            break
        }
    }

    let matchLoserIndex
    for (i = 0; i < teams.length; i++) {
        if (matchLoser.id == teams[i].id) {
            matchLoserIndex = i
            break
        }
    }

    // Stats change
    let rankingEarned = Math.floor((Math.random() * 25) + 50) // random between 25 & 50
    teams[matchWinnerIndex].pointsCurrent += 6
    teams[matchWinnerIndex].ranking += rankingEarned
    teams[matchWinnerIndex].timesWon += 1
    teams[matchLoserIndex].timesLost += 1

    resultsMessageHTML.innerHTML = 'You finished a match!'
    
    if (teams[matchWinnerIndex].playerTeam == true) {
        resultsMessage2HTML.innerHTML = '<br />' + 'You earned 6 points!' + '<br />Your ranking has increased by ' + rankingEarned + '!'
        
    } else {
        resultsMessage2HTML.innerHTML = '<br />' + 'Unfortunately, you were defeated.'
    }

    // Play the games for the rest of the teams! (coin toss)
    let teamsOnBLU = JSON.parse(localStorage.getItem('teamsOnBLU'))
    let teamsOnRED = JSON.parse(localStorage.getItem('teamsOnRED'))
    for (i = 0; i < teamsOnBLU.length; i++) {
        let winnerTeam

        if (teamsOnBLU[i].playerTeam == false && teamsOnRED[i].playerTeam == false) {
            let rollResult = Math.floor(Math.random() * 2)
            if (rollResult == 0) {
                winnerTeam = teamsOnBLU[i]
            } else {
                winnerTeam = teamsOnRED[i]
            }

            // Set points & ranking for the winning team
            for (j = 0; j < teams.length; j++) {
                if (teams[j].id == winnerTeam.id) {
                    teams[j].pointsCurrent += 6
                    teams[j].ranking += Math.floor((Math.random() * 25) + 50) // random between 25 & 50
                }
            }     
        }
    }

    // Finally, store values to continue the game
    localStorage.setItem('matchDay',  0)
    localStorage.setItem('matchDayNumber',  parseInt(localStorage.getItem('matchDayNumber')) + 5)
    localStorage.setItem('teams',  JSON.stringify(teams))
}

// Roll for event at the start of day (can only happen after the 3rd day)
function rollEvent() {
    // Advance the day & store
    localStorage.setItem('dayCurrent', parseInt(localStorage.getItem('dayCurrent')) + 1)

    if (localStorage.getItem('matchDayNumber') == localStorage.getItem('dayCurrent')) {
        localStorage.setItem('matchDay', 1)
    }
    
    // Roll for event (check if possible first)
    if (localStorage.getItem('dayCurrent') > 3 
    && localStorage.getItem('matchDay') == 0
    && localStorage.getItem('leaderboardPrizeDay') != parseInt(localStorage.getItem('dayCurrent'))) {
        // Roll for event
        let rollEventNum = Math.floor(Math.random() * 6)
        if (rollEventNum == 1) {
            // Choose an event randomly and go to events.js
            localStorage.setItem('eventIndex', Math.floor(Math.random() * events.length))
            redirectToEvents()
        } else {
            redirectToMenu()
        }
    } else {
        redirectToMenu()
    }  
}

// Calculate every team's points and store the teams inside teamsSorted locally!
function calculateNewLeaderboardResults() {
    // Sort teams by points
    let teamsSorted = teams.slice(0).sort(
        function(a, b) {
            return b.pointsCurrent - a.pointsCurrent
    })
    
    // Calculate 'place' (for starts from second array element because the first is initialized for comparisons)
    let placeCounter = 1
    teamsSorted[0].place = placeCounter

    let i = 0
    for (i = 1; i < teamsSorted.length; i++) {
        if(teamsSorted[i].pointsCurrent == teamsSorted[i-1].pointsCurrent) {
            teamsSorted[i].place = placeCounter
        } else {
            placeCounter += 1
            teamsSorted[i].place = placeCounter
        }
    }
    
    // Store teamsSorted locally
    localStorage.setItem('teamsSorted',  JSON.stringify(teamsSorted))
}

// CHECK FOR WIN CONDITIONS EVERY TIME
if (localStorage.getItem('winConditions') == 1) {
    // Check every team's points
    for (i = 0; i < teams.length; i++) {
        if (teams[i].pointsCurrent >= 100) {
            // Check if it's the player's team
            if (teams[i].playerTeam == true) {
                localStorage.setItem('playerWon', 1)
            } else {
                localStorage.setItem('playerWon', 0)
            }

            // Stop the for loop
            redirectToEndGame()
        }
    }
} else if (localStorage.getItem('winConditions') == 2) {
    // Check every team's points
    for (i = 0; i < teams.length; i++) {
        if (teams[i].ranking >= 2300) {
            // Check if it's the player's team
            if (teams[i].playerTeam == true) {
                localStorage.setItem('playerWon', 1)
            } else {
                localStorage.setItem('playerWon', 0)
            }

            // Stop the for loop
            redirectToEndGame()
        }
    }
}