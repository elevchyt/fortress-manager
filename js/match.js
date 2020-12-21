// Match captions
var captions = ["rockets firing...", "pistols whistling...", "ubers ubering..."
, "stickies shooting...", "pipes connecting...", "points captured..."
, "snipers sniping...", "spies cloacking...", "gibs falling...", "spires jumped..."
, "shotguns blasting...", "headshots hitting...", "ubers dropping...", "strafes strafing..."]

// Match Variables
let teamBlu, teamRed
let scoreBlu = 0
let scoreRed = 0
let roundWinner, matchWinner, matchLoser
let roundEnd = false // whenever this changes to true, the round will be playing
let matchEnd = false

let teamsOnBLU = JSON.parse(localStorage.getItem('teamsOnBLU'))
let teamsOnRED = JSON.parse(localStorage.getItem('teamsOnRED'))

// DOM Elements
teamBluHTML = document.querySelector('.team-blu')
teamRedHTML = document.querySelector('.team-red')
scoreBluHTML = document.querySelector('.score-blu')
scoreRedHTML = document.querySelector('.score-red')
captionHTML = document.querySelector('.match-caption')
winnerHTML = document.querySelector('.winner')
spinnerHTML = document.querySelector('.spinner')
buttonConfirmHTML = document.querySelector('.button-match-confirm')

captionHTML.innerHTML = '. . .'

// Find the player's match and show on the scoreboard
for (i = 0; i < teamsOnBLU.length; i++) {
    // Search BLU teams (teams[0].id is always the player)
    if (teamsOnBLU[i].id == teams[0].id || teamsOnRED[i].id == teams[0].id) {
        teamBlu = teamsOnBLU[i]
        teamRed = teamsOnRED[i]
        matchPlayerIndex = i
        break
    }
}
teamBluHTML.innerHTML = teamsOnBLU[matchPlayerIndex].name
teamRedHTML.innerHTML = teamsOnRED[matchPlayerIndex].name

// LAUNCH MATCH
roundStartCountdown()

// Round winner decide
function roundWinnerCalculate() {
    let roundWinTeam

    // Decide round winner
    let oddsBLU = teamsOnBLU[matchPlayerIndex].ranking + (teamsOnBLU[matchPlayerIndex].overallTotal * 10)
    let oddsRED = teamsOnRED[matchPlayerIndex].ranking + (teamsOnRED[matchPlayerIndex].overallTotal * 10)
    let totalOdds = oddsBLU + oddsRED
    let rollValue = Math.floor(Math.random() * (oddsBLU + oddsRED))

    if (rollValue > oddsBLU) {
        roundWinTeam = teamRed
    } else {
        roundWinTeam = teamBlu
    }

    console.log('Odds BLU: ' + oddsBLU)
    console.log('Odds RED: ' + oddsRED)
    console.log(rollValue)

    // Draw new score & check if score is 3 to end the match every time
    if (roundWinTeam == teamBlu) {
        scoreBlu += 1
        scoreBluHTML.innerHTML = scoreBlu

        if (scoreBlu == 3) {
            matchEnd = true
            matchWinner = teamBlu
            matchLoser = teamRed
            winnerHTML.innerHTML = '<h2><span class="team-blu">' + matchWinner.name + '</span> won!</h2>'
            captionHTML.innerHTML = 'Match over.'
        }
    } else {
        scoreRed += 1
        scoreRedHTML.innerHTML = scoreRed

        if (scoreRed == 3) {
            matchEnd = true
            matchWinner = teamRed
            matchLoser = teamBlu
            winnerHTML.innerHTML = '<h2><span class="team-red">' + matchWinner.name + '</span> won!</h2>'
        }
    }

    // Store locally
    localStorage.setItem('whatDidYouDo', 'match')
    localStorage.setItem('matchWinner', JSON.stringify(matchWinner))
    localStorage.setItem('matchLoser', JSON.stringify(matchLoser))

    return roundWinTeam
}

// Timers (roundStartCountdown() launches the match!)
function roundStartCountdown() {
    // Round start countdown begin
    roundEnd = false
    captionHTML.innerHTML = 'Round is about to begin...'

    if (matchEnd == true) {
        captionHTML.innerHTML = 'Match over.'

        // Hide spinner and show button
        spinnerHTML.style.display = 'none'
        buttonConfirmHTML.style.display = 'block'
    } else {
        setTimeout( function() {
                rollRound()
        }, 1000)
    }
}

function rollRound() {
    if (matchEnd == false) {
        // Round end countdown begin
        roundEndCountdown()

        roundInterval = setInterval( function() {
            if (roundEnd == false) {
                captionHTML.innerHTML = captions[Math.floor(Math.random() * captions.length)]
            }
        }, 1000)
    }
}

function roundEndCountdown() {
    setTimeout(
        function() {
            clearInterval(roundInterval)
            roundTimeUntilNextCountdown()
            roundEnd = true

            let roundWinner = roundWinnerCalculate()
            captionHTML.innerHTML = roundWinner.name + ' win the round!'
        }, 4000);
}

function roundTimeUntilNextCountdown() {
    setTimeout(
        function() {
            roundStartCountdown()
        }, 1000);
}