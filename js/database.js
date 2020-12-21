// Teams & Player's team players
let teams = [
    {
        "id": 0,
        "name": "Default Name",
        "ranking": 1600,
        "pointsCurrent": 0,
        "budget": 300,
        "playerTeam": true,
        "place": 0,
        "overallTotal": 30,
        "timesWon": 0,
        "timesLost": 0
    },
    {
        "id": 1,
        "name": "Rocket Eagles",
        "ranking": 1600,
        "pointsCurrent": 0,
        "budget": 300,
        "playerTeam": false,
        "place": 0,
        "overallTotal": 30,
        "timesWon": 0,
        "timesLost": 0
    },
    {
        "id": 2,
        "name": "Raiders",
        "ranking": 1600,
        "pointsCurrent": 0,
        "budget": 300,
        "playerTeam": false,
        "place": 0,
        "overallTotal": 30,
        "timesWon": 0,
        "timesLost": 0
    },
    {
        "id": 3,
        "name": "Blazing Falcons",
        "ranking": 1600,
        "pointsCurrent": 0,
        "budget": 300,
        "playerTeam": false,
        "place": 0,
        "overallTotal": 30,
        "timesWon": 0,
        "timesLost": 0
    },
    {
        "id": 4,
        "name": "Red Scorpions",
        "ranking": 1600,
        "pointsCurrent": 0,
        "budget": 300,
        "playerTeam": false,
        "place": 0,
        "overallTotal": 30,
        "timesWon": 0,
        "timesLost": 0
    },
    {
        "id": 5,
        "name": "The Mackerels",
        "ranking": 1600,
        "pointsCurrent": 0,
        "budget": 300,
        "playerTeam": false,
        "place": 0,
        "overallTotal": 30,
        "timesWon": 0,
        "timesLost": 0
    }
]

let players = [
    {
        "name": 'Scout 1',
        "skill": 5,      // 1-10
        "coop": 5, // 1-10
        "overall": 0    // skill + co-op / 2
    },
    {
        "name": 'Scout 2',
        "skill": 5,      // 1-10
        "coop": 5, // 1-10
        "overall": 0    // skill + co-op / 2
    },
    {
        "name": 'Soldier 1',
        "skill": 5,      // 1-10
        "coop": 5, // 1-10
        "overall": 0    // skill + co-op / 2
    },
    {
        "name": 'Soldier 2',
        "skill": 5,      // 1-10
        "coop": 5, // 1-10
        "overall": 0    // skill + co-op / 2
    },
    {
        "name": 'Demoman',
        "skill": 5,      // 1-10
        "coop": 5, // 1-10
        "overall": 0    // skill + co-op / 2
    },
    {
        "name": 'Medic',
        "skill": 5,      // 1-10
        "coop": 5, // 1-10
        "overall": 0    // skill + co-op / 2
    }
]

let events = [
    {
        "description": "A person approaches you and kindly asks if you manage a Team Fortress 2 team and thinks he has seen you in some form of media, but he can't recall from where. As you look at him, you notice that this person has a particularly bad odor and his clothes look quite dirty. What do you do?",
        "choiceOne": "Confirm that it is you.",
        "choiceTwo": "Say nothing and move on.",
        "outcomeGood": "Turns out that this person is a well off luxury construction worker that is also a big fan of your team. As a result, he donates $300 to your team's budget!",
        "outcomeBad": "You reply positively, before you ask for the persons name, he strikes you in the head and steals your wallet. Consequently, he grabs your wallet that contains $180 of your team's budget and makes a run for it!",
        "outcomeNeutral": "You decide to keep on walking, ignoring the existance of that person.",
        "budgetGain": 300,
        "budgetLoss": 180
    },
    {
        "description": "You are being interviewed by an eSports journalist when he asks you how important are, in your opinion, regular match reviews in a professional team. You take a second to think and decide to answer in the following manner.",
        "choiceOne": "Thorough answer",
        "choiceTwo": "'We only play MGE.'",
        "outcomeGood": "The news outlet is staggered by your well-thought answer and provides the team with $150 in order to get more statements from you.",
        "outcomeBad": "Your explanation somehow reaches a point where you are suggesting your team's superiority over other teams in the league. You also said something about 'competitive dogfights' and referred to yourself as 'king of huhy dm'. The league has fined you $75 for your statements.",
        "outcomeNeutral": "The interviewer is caught by surprise by your answer and starts laughing for 6 minutes straight. Little did he know, you weren't joking.",
        "budgetGain": 150,
        "budgetLoss": 75
    },
    {
        "description": "You're informed by your Medic player that there is a meeting between the managers of every team that competes in the league in order to raise money for various charities. There's no way out of this one you cheap bastard.",
        "choiceOne": "Attend",
        "choiceTwo": "Call in sick",
        "outcomeGood": "Surprise! It's your birthday and your team is throwing you a party ! They all decided to chip in and give you a total of $120 for you to invest in the team!",
        "outcomeBad": "You book a plane ticket and a hotel to stay for the night after you attend the meeting, costing you $100. Little did you know, it was your birthday and your team was throwing you a surprise party expecting you to call in sick, knowing well enough what a penny-pinching person you are.",
        "outcomeNeutral": "You call in sick, staying in bed all night while listening to uninteresting global warming podcasts.",
        "budgetGain": 120,
        "budgetLoss": 100
    },
    {
        "description": "Your team is invited to participate to a brand new charity event named 'Save the orphans'. The event is hosted by some old league players. What do you do?",
        "choiceOne": "Accept",
        "choiceTwo": "Decline",
        "outcomeGood": "The event turned out to be very successful to your team's reputation! As a result, a few sponsors chipped in after the event was over and donated $200 to your team's budget as a sign of appreciation for your participation!",
        "outcomeBad": "You accept the invitation, only to find out that the invational e-mail was a scam that got you into paying an $80 participation fee!",
        "outcomeNeutral": "You collect your thoughts and decide to maintain your team's practice routine.",
        "budgetGain": 200,
        "budgetLoss": 80
    }
]

// Day / Leaderboard variables
let dayCurrent = 1
let leaderboardPrizeDay = 10
let leaderboardPrize = 50

// Match variables (every 5 days there is a match)
let matchDay = 0
let matchDayNumber = 5

// What the player did this day (used in results)
// none, skip, practicetype, match, event
let whatDidYouDo = 'none'

// Load local storage if it exists and replace the teams array
if (localStorage.getItem('teams') != null) {
    teams = JSON.parse(localStorage.getItem('teams'))
    teamsSorted = JSON.parse(localStorage.getItem('teamsSorted'))
    players = JSON.parse(localStorage.getItem('players'))
    dayCurrent = localStorage.getItem('dayCurrent')
    leaderboardPrizeDay = localStorage.getItem('leaderboardPrizeDay')
    leaderboardPrize = localStorage.getItem('leaderboardPrize')
    matchDay = localStorage.getItem('matchDay')
    whatDidYouDo = localStorage.getItem('whatDidYouDo')
}