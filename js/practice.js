// Calculate Costs
let dexterityCost = 0
let reviewCost = 0
let coachingCost = 0

// Dexterity Cost
if (teams[0].ranking <= 1600) {
    dexterityCost = 100
} else if (teams[0].ranking > 1600 && teams[0].ranking < 1800) {
    dexterityCost = 250
} else if (teams[0].ranking >= 1800 && teams[0].ranking < 2000) {
    dexterityCost = 400
} else if (teams[0].ranking >= 2000) {
    dexterityCost = 600
}

// Review Cost
if (teams[0].ranking <= 1600) {
    reviewCost = 80
} else if (teams[0].ranking > 1600 && teams[0].ranking < 1800) {
    reviewCost = 160
} else if (teams[0].ranking >= 1800 && teams[0].ranking < 2000) {
    reviewCost = 320
} else if (teams[0].ranking >= 2000) {
    reviewCost = 500
}

// Coaching Cost
if (teams[0].ranking <= 1600) {
    coachingCost = 250
} else if (teams[0].ranking > 1600 && teams[0].ranking < 1800) {
    coachingCost = 500
} else if (teams[0].ranking >= 1800 && teams[0].ranking < 2000) {
    coachingCost = 750
} else if (teams[0].ranking >= 2000) {
    coachingCost = 1000
}
// = = = = = = = = = = = = = = = =
// Results Calculation Functions
// Variables
let skillGain = []
let skillLoss = []
let coopGain = []
let coopLoss = []

// Buy Functions
function dexterityBuy() {
    if (teams[0].budget >= dexterityCost) {
        if (confirm('Get your team some dexterity practice for $' + dexterityCost + '?')) {
            teams[0].budget -= dexterityCost
            dexterityPractice()
    
            // Store database locally
            localStorage.setItem('teams',  JSON.stringify(teams))
            localStorage.setItem('players',  JSON.stringify(players))

            // End the day & store & show results
            localStorage.setItem('whatDidYouDo', 'practiceDexterity')
            localStorage.setItem('dayCurrent', parseInt(localStorage.getItem('dayCurrent')) + 1)
            localStorage.setItem('skillGain',  JSON.stringify(skillGain))    
            localStorage.setItem('coopLoss',  JSON.stringify(coopLoss))    
            redirectToResults()
        }
    } else {
        alert("Your budget isn't high enough for this type of practice! ($" + dexterityCost + ")")
    }
}

function reviewBuy() {
    if (teams[0].budget >= reviewCost) {
        if (confirm('Review previous matches with your team for $' + reviewCost + '?')) {
            teams[0].budget -= reviewCost
            reviewPractice()
    
            // Store database locally
            localStorage.setItem('teams',  JSON.stringify(teams))
            localStorage.setItem('players',  JSON.stringify(players))

            // End the day & store & show results
            localStorage.setItem('whatDidYouDo', 'practiceReview')
            localStorage.setItem('dayCurrent', parseInt(localStorage.getItem('dayCurrent')) + 1)
            localStorage.setItem('coopGain',  JSON.stringify(coopGain))    
            localStorage.setItem('skillLoss',  JSON.stringify(skillLoss))    
            redirectToResults()
        }
    } else {
        alert("Your budget isn't high enough for this type of practice! ($" + reviewCost + ")")
    }
}

function coachingBuy() {
    if (teams[0].budget >= coachingCost) {
        if (confirm("Get a professional coach to work on your team's cooperation and tactics for $" + coachingCost + '?')) {
            teams[0].budget -= coachingCost
            coachingPractice()
    
            // Store database locally
            localStorage.setItem('teams',  JSON.stringify(teams))
            localStorage.setItem('players',  JSON.stringify(players))

            // End the day & store & show results
            localStorage.setItem('whatDidYouDo', 'practiceCoaching')
            localStorage.setItem('dayCurrent', parseInt(localStorage.getItem('dayCurrent')) + 1)
            localStorage.setItem('coopGain',  JSON.stringify(coopGain))    
            localStorage.setItem('skillLoss',  JSON.stringify(skillLoss))    
            redirectToResults()
        }
    } else {
        alert("Your budget isn't high enough for this type of practice! ($" + coachingCost + ")")
    }
}


// Practice Functions
function dexterityPractice() { 
    var i = 0
    for (i = 0; i < 6; i++) {
        // Skill Gain
        skillGain[i] = Math.floor(Math.random() * 4)

        // Coop Loss
        coopLoss[i] = -Math.floor(Math.random() * 2)

        // Change players stats on database.js
        players[i].skill += skillGain[i]
        players[i].coop += coopLoss[i]

        // Floor to 1 if under 1 & cap to 10 if more than 10
        if (players[i].skill < 1) { players[i].skill = 1 }
        else if (players[i].skill > 10) { players[i].skill = 10 }

        if (players[i].coop < 1) { players[i].coop = 1 }
        else if (players[i].coop > 10) { players[i].coop = 10 }

        // Re-calculate overall
        players[i].overall = (players[i].skill + players[i].coop) / 2
    }
}

function reviewPractice() {
    var i = 0
    for (i = 0; i < 6; i++) {
        // Coop Gain
        coopGain[i] = Math.floor(Math.random() * 4)

        // Skill Loss
        skillLoss[i] = -Math.floor(Math.random() * 2)

        // Change players stats on database.js
        players[i].skill += skillLoss[i]
        players[i].coop += coopGain[i]

        // Floor to 1 if under 1 & cap to 10 if more than 10
        if (players[i].skill < 1) { players[i].skill = 1 }
        else if (players[i].skill > 10) { players[i].skill = 10 }

        if (players[i].coop < 1) { players[i].coop = 1 }
        else if (players[i].coop > 10) { players[i].coop = 10 }

        // Re-calculate overall
        players[i].overall = (players[i].skill + players[i].coop) / 2
    }
}

function coachingPractice() {
    var i = 0
    for (i = 0; i < 6; i++) {
        // Coop Gain
        coopGain[i] = Math.floor(Math.random() * 5)

        // Skill Loss
        skillLoss[i] = -Math.floor(Math.random() * 2)

        // Change players stats on database.js
        players[i].skill += skillLoss[i]
        players[i].coop += coopGain[i]

        // Floor to 1 if under 1 & cap to 10 if more than 10
        if (players[i].skill < 1) { players[i].skill = 1 }
        else if (players[i].skill > 10) { players[i].skill = 10 }

        if (players[i].coop < 1) { players[i].coop = 1 }
        else if (players[i].coop > 10) { players[i].coop = 10 }

        // Re-calculate overall
        players[i].overall = (players[i].skill + players[i].coop) / 2
    }
}