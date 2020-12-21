// Set current budget & ranking & starting day HTML
let teamNameHTML = document.querySelector('.team-name')
let dayCurrentHTML = document.querySelector('.day-current')
let budgetHTML = document.querySelector('.budget')
let rankingHTML = document.querySelector('.ranking')

dayCurrentHTML.innerHTML = 'Day ' + dayCurrent
teamNameHTML.innerHTML = teams[0].name
budgetHTML.innerHTML = '$' + teams[0].budget
rankingHTML.innerHTML = teams[0].ranking

// Buttons HTML (change based on schedule's matchDay)
let practiceHTML = document.querySelector('.practice-button')
let matchHTML = document.querySelector('.match-button')
let skipHTML = document.querySelector('.skip-button')

if (matchDay == true) {
    practiceHTML.disabled = true
    skipHTML.disabled = true

    // Create the matches (who plays with who)
    matchFixtures()
} else {
    matchHTML.disabled = true
}

// Skip Day Function
function skipDay() {
    if (confirm('Would you like to skip the day?')) {
        localStorage.setItem('whatDidYouDo', 'skip')

        redirectToResults()
    }
}

// Match fixtures on matchDay (FUNCTION) (who plays with who)
function matchFixtures() {
    // Teams that play blue & red
    let teamsOnBLU = []
    let teamsOnRED = []
    let teamsSorted = JSON.parse(localStorage.getItem('teamsSorted'))

    let i = 0
    let arrayIndex = 0 // used to save in the arrays without skipping positions
    for (i = 0; i < teamsSorted.length; i += 2) {
        teamsOnBLU[arrayIndex] = teamsSorted[i]
        teamsOnRED[arrayIndex] = teamsSorted[i+1]
        arrayIndex += 1
    }

    // Store match fixtures to be used in match.js
    localStorage.setItem('teamsOnBLU', JSON.stringify(teamsOnBLU))
    localStorage.setItem('teamsOnRED', JSON.stringify(teamsOnRED))
}

//
//
// Leaderboard 1st Place day check
if (dayCurrent == localStorage.getItem('leaderboardPrizeDay')) {
    // If player's team is 1st place
    teamsSorted = JSON.parse(localStorage.getItem('teamsSorted'))
    teams = JSON.parse(localStorage.getItem('teams'))
    
    let i = 0
    for (i< 0; i < teams.length; i++) {
        // If this team is 1st place...
        if (teamsSorted[i].place == 1) {
            // Set budget inside teams (find index based on sortedTeams id)
            let teamsIndex
            let j = 0
            for (j = 0; j < teams.length; j++) {
                if (teamsSorted[i].id == teams[j].id) {
                    teamsIndex = j
                    break // exit for loop
                }
            }
            teams[teamsIndex].budget += parseInt(localStorage.getItem('leaderboardPrize'))
            
            localStorage.setItem('teams', JSON.stringify(teams))

            // (alert + html) If it's the player's team then show an alert
            if (teamsSorted[i].playerTeam == true) {
                setTimeout(function() {
                    alert('You won $' + parseInt(localStorage.getItem('leaderboardPrize')) + ' from the leaderboard challenge by being 1st place today!')
                    budgetHTML.innerHTML = '$' + teams[teamsIndex].budget 
                }, 200)   
            }
        } 
            
        // (alert) If not 1st place & it's the player's team
        else if (teamsSorted[i].place != 0 && teamsSorted[i].playerTeam == true) {
            setTimeout(function() {
                alert('You missed the leaderboard challenge prize!')
            }, 200)
        }
    }

    setTimeout(function () {
        // Find next prize day & prize amount & finally save teamsSorted
        localStorage.setItem('leaderboardPrize', parseInt(localStorage.getItem('leaderboardPrize') * 1.2))
        localStorage.setItem('leaderboardPrizeDay', parseInt(localStorage.getItem('leaderboardPrizeDay')) + 10)
    }, 300)
}