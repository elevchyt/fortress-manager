// Events are short stories of events happening where the player decides between choices 
// and the outcome is a 50/50 chance of something good/bad happening

// Variable to hold budget earned/lost
let budgetChange = 0

// DOM Elements
let descriptionHTML = document.querySelector(".event-description")
let choiceOneHTML = document.querySelector(".event-button-1")
let choiceTwoHTML = document.querySelector(".event-button-2")

descriptionHTML.innerHTML = '<i>' + events[localStorage.getItem('eventIndex')].description + '</i>'
choiceOneHTML.innerHTML = events[localStorage.getItem('eventIndex')].choiceOne
choiceTwoHTML.innerHTML = events[localStorage.getItem('eventIndex')].choiceTwo

// Choice One
function choiceOne() {
    let rollResult = Math.floor(Math.random() * 2)
    if (rollResult == 1) {
        teams[0].budget += events[localStorage.getItem('eventIndex')].budgetGain
        localStorage.setItem('eventResult', 1)
    } else {
        if (teams[0].budget >= events[localStorage.getItem('eventIndex')].budgetLoss)
        {
            teams[0].budget -= events[localStorage.getItem('eventIndex')].budgetLoss
            localStorage.setItem('eventResult', 2)
        } else {
            teams[0].budget = 0
            localStorage.setItem('eventResult', 2)
        }
        
    }

    // Store new values & go to results
    localStorage.setItem('teams',  JSON.stringify(teams))
    localStorage.setItem('events',  JSON.stringify(events))
    localStorage.setItem('eventIndex', localStorage.getItem('eventIndex'))
    localStorage.setItem('whatDidYouDo', 'event')

    redirectToResults()
}

// Choice Two
function choiceTwo() {
    let rollResult = Math.floor(Math.random() * 2)

    localStorage.setItem('eventResult', 3)

    // Store new values & go to results
    localStorage.setItem('teams',  JSON.stringify(teams))
    localStorage.setItem('events',  JSON.stringify(events))
    localStorage.setItem('eventIndex', localStorage.getItem('eventIndex'))
    localStorage.setItem('whatDidYouDo', 'event')

    redirectToResults()
}