const choiceButtons = document.querySelectorAll('[data-choice]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const CHOICES = [{
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌️',
        beats: 'paper'
    }
]

choiceButtons.forEach(choiceButton => {
    choiceButton.addEventListener('click', e => {
        const choiceName = choiceButton.dataset.choice
        const choice = CHOICES.find(choice => choice.name === choiceName)
        makeChoice(choice)
    })
})

function makeChoice(choice) {
    const computerChoice = randomChoice()
    const yourWinner = isWinner(choice, computerChoice)
    const computerWinner = isWinner(computerChoice, choice)
    console.log(computerChoice)

    addChoiceResult(computerChoice, computerWinner)
    addChoiceResult(choice, yourWinner)

    if (yourWinner) incrementScore(yourScoreSpan)
    if (computerWinner) incrementScore(computerScoreSpan)
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addChoiceResult(choice, winner) {
    const div = document.createElement('div')
    div.innerText = choice.emoji
    div.classList.add('result-choice')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

function isWinner(choice, opponentChoice) {
    return choice.beats === opponentChoice.name
}

function randomChoice() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length)
    return CHOICES[randomIndex]
}
