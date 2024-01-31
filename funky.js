
export const existingSave = await getExistingSave()

let activeCard = existingSave.activeCard
let activeDeck = existingSave.activeDeck

 

export async function fillCard(a, c, d){
  
const mainContainer = document.getElementById('main-container');
const existingSave = await getExistingSave()
if (existingSave[c].length > 0){
    mainContainer.innerHTML = `
    <div class="card" style="animation: ${d}">
        <button id="tally-plus-button">+</button>
        <p id="card-top-line" class="card-text">${existingSave[c][a].workoutName}</p>
        <p class="card-text">Rep Range: ${existingSave[c][a].repRange}</p>
        <p class="card-text">Weight: ${existingSave[c][a].weightRange}</p>
        <p class="card-text">Set Goal: ${existingSave[c][a].setGoal} Sets</p>
        <p id="sets-completed">${existingSave[c][a].setsCompleted}</p>
        <button id="tally-minus-button">-</button>
    </div>`
    tallyCheckers()




    ;
} else{
    mainContainer.innerHTML = `<div class="card"><p class="card-text">No Cards</p></div>`;

    }
} 
export function getExistingSave() {
    return new Promise(resolve => {
        const existingSave = JSON.parse(localStorage.getItem('workout-thing-save'));
        resolve(existingSave || {
            activeCard: 0,
            activeDeck: "deckOne",
            deckOne: [],
            deckTwo: [],
            deckThree: [],
            deckFour: []
        });
    });
}


export async function checkButtons() {
    const existingSave = await getExistingSave();

    // Now you can safely access existingSave.activeCard and existingSave.activeDeck
    let activeCard, activeDeck;

    if (existingSave) {
        activeDeck = existingSave.activeDeck;
        activeCard = existingSave.activeCard;
    }

    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const editCardButton = document.getElementById('edit-card-button');

    if (existingSave && existingSave[activeDeck].length === 0){
        prevButton.hidden = true;
        nextButton.hidden = true;
        editCardButton.hidden = true;
    } else if (existingSave && existingSave[activeDeck].length === 1) {
        prevButton.hidden = true;
        nextButton.hidden = true;
        editCardButton.hidden = false;
    } else if (existingSave && existingSave[activeDeck].length >= 2 && activeCard+1 < existingSave[activeDeck].length && activeCard === 0){
        prevButton.hidden = true;
        nextButton.hidden = false;
        nextButton.addEventListener('click', increaseActiveCard);
        detectSwipeRight()
        editCardButton.hidden = false;
    } else if (existingSave && existingSave[activeDeck].length >= 2 && activeCard+1 < existingSave[activeDeck].length && activeCard !== 0){
        prevButton.hidden = false;
        prevButton.addEventListener('click', decreaseActiveCard); 
        nextButton.hidden = false;
        nextButton.addEventListener('click', increaseActiveCard);
        detectSwipeRight()
        detectSwipeLeft()
        editCardButton.hidden = false;
    } else if (existingSave && existingSave[activeDeck].length >= 2 && activeCard+1 === existingSave[activeDeck].length){
        prevButton.hidden = false;
        nextButton.hidden = true;
        prevButton.addEventListener('click', decreaseActiveCard); 
        detectSwipeLeft()
    } 

    console.log(existingSave ? existingSave[activeDeck].length : 'No existingSave' );
    console.log(activeCard)
}

// Call checkButtons when the DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
});
export function saveNewCard(){
    const workoutNameInput = document.getElementById('workout-name-input');
    const repRangeInput = document.getElementById('rep-range-input');
    const weightRangeInput = document.getElementById('weight-range-input');
    const setGoalInput = document.getElementById('set-goal-input');
    const setsCompleted = document.getElementById('sets-completed');
    let trialObject = {
    workoutName: workoutNameInput.value,
    repRange: repRangeInput.value,
    weightRange: weightRangeInput.value,
    setGoal: setGoalInput.value,
    setsCompleted: 0
    }
    if (!existingSave){
let trialSave = {
    activeCard: activeCard,
    activeDeck: activeDeck,
    deckOne: [],
    deckTwo: [],
    deckThree: [],
    deckFour: []
}
trialSave[activeDeck].push(trialObject)
localStorage.setItem('workout-thing-save', JSON.stringify(trialSave))
const popUp = document.getElementById('pop-up-container')
popUp.style.zIndex = -1;
    } else {
        existingSave[activeDeck].push(trialObject)
        let temp = existingSave[activeDeck].length - 1 

        existingSave.activeCard = temp
        localStorage.setItem('workout-thing-save', JSON.stringify(existingSave))
        const popUp = document.getElementById('pop-up-container')
        popUp.style.zIndex = -1;
    fillCard(temp, activeDeck)
    checkButtons()
    }
    
}
function increaseActiveCard(){
    let a = existingSave.activeCard = existingSave.activeCard + 1
    let c = existingSave.activeDeck
    let d = `slideCardLeft 1s ease-in-out;`
    localStorage.setItem('workout-thing-save', JSON.stringify(existingSave));
    fillCard(a, c, d)
    
checkButtons()

}
function decreaseActiveCard(){
    let a = existingSave.activeCard = existingSave.activeCard - 1
    let c = existingSave.activeDeck
    let d = `slideCardRight 1s ease-in-out;`
localStorage.setItem('workout-thing-save', JSON.stringify(existingSave));
fillCard(a, c, d)
checkButtons()

}
export function changeDeck(event){
    console.log(event.target.id)
    let a = 0
    let c = event.target.id
    existingSave.activeCard = a
    existingSave.activeDeck = c
localStorage.setItem('workout-thing-save', JSON.stringify(existingSave));
fillCard(a, c)
const deckButtons = document.querySelectorAll('.decks');
deckButtons.forEach(deck => {
    deck.addEventListener('click', changeDeck);
    if(deck.id === event.target.id){
        deck.style.color = 'white';
        deck.style.border = `1px solid rgb(226, 139, 139)`
    } else {
        deck.style.color = `rgb(226, 139, 139)`;
        deck.style.border = ``
    }
})
}
const deckButtons = document.querySelectorAll('.decks');
deckButtons.forEach(deck => {
    deck.addEventListener('click', changeDeck);
    if(deck.id === activeDeck){
        deck.style.color = 'white';
        deck.style.border = `1px solid rgb(226, 139, 139)`
    }
})

export function detectSwipeLeft() {
    let startX;
    let swipeThreshold = 50;

    // Define the event handler function
    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        let currentX = event.touches[0].clientX;
        let diffX = currentX - startX;

        if (Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                console.log('Swipe left detected!');
                decreaseActiveCard();
                
                // Remove event listeners after swipe
                document.removeEventListener('touchstart', handleTouchStart);
                document.removeEventListener('touchmove', handleTouchMove);
            } else {
                document.removeEventListener('touchstart', handleTouchStart);
                document.removeEventListener('touchmove', handleTouchMove);
            }

            // Reset startX to prevent continuous detection
            startX = null;
        }
    }

    // Add event listeners with references to the functions
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
}



export function detectSwipeRight() {
    let startX;
    let swipeThreshold = 50;

    // Define the event handler function
    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        let currentX = event.touches[0].clientX;
        let diffX = currentX - startX;

        if (Math.abs(diffX) > swipeThreshold) {
            if (diffX < 0) {
                console.log('Swipe right detected!');
                increaseActiveCard();
                
                // Remove event listeners after swipe
                document.removeEventListener('touchstart', handleTouchStart);
                document.removeEventListener('touchmove', handleTouchMove);
            } else {
                document.removeEventListener('touchstart', handleTouchStart);
                document.removeEventListener('touchmove', handleTouchMove);
            }

            // Reset startX to prevent continuous detection
            startX = null;
        }
    }

    // Add event listeners with references to the functions
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
}

    export function editCard() {
        const popup = document.getElementById('pop-up-container');
        popup.style.zIndex = 1;
        const workoutNameInput = document.getElementById('workout-name-input');
        const repRangeInput = document.getElementById('rep-range-input');
        const weightRangeInput = document.getElementById('weight-range-input');
        const setGoalInput = document.getElementById('set-goal-input');
        const setsCompleted = document.getElementById('sets-completed');
        const exitButton = document.getElementById('exit-button');
        
        // Update the values of the active card in the saveArray
        const activeCard = existingSave.activeCard;
        const activeDeck = existingSave.activeDeck;
        const currentCard = existingSave[activeDeck][activeCard]
        workoutNameInput.value = currentCard.workoutName || '';
        repRangeInput.value = currentCard.repRange || '';
        weightRangeInput.value = currentCard.weightRange || '';
        setGoalInput.value = currentCard.setGoal || '';
        console.log(currentCard)
        const saveButton = document.getElementById('save-button');
        saveButton.addEventListener('click', function updateCard(){
            const workoutNameInput = document.getElementById('workout-name-input');
        const repRangeInput = document.getElementById('rep-range-input');
        const weightRangeInput = document.getElementById('weight-range-input');
        const setGoalInput = document.getElementById('set-goal-input');
        const setsCompleted = document.getElementById('sets-completed');
        
        currentCard.workoutName = workoutNameInput.value,
        currentCard.repRange = repRangeInput.value,
        currentCard.weightRange = weightRangeInput.value,
        currentCard.setGoal = setGoalInput.value,
        localStorage.setItem('workout-thing-save', JSON.stringify(existingSave));
        
        console.log(currentCard)
        popup.style.zIndex = -1;
        fillCard(existingSave.activeCard, existingSave.activeDeck)
        })
        exitButton.addEventListener('click', function () {
            popup.style.zIndex = -1;
        });
}
function tallyCheckers() {
        const tallyPlusButton = document.getElementById('tally-plus-button');
        const tallyMinusButton = document.getElementById('tally-minus-button');
        
        tallyPlusButton.addEventListener('click', increaseSet)

        tallyMinusButton.addEventListener('click', decreaseSet)
    }

    function increaseSet(){
        const activeCard = existingSave.activeCard;
        const activeDeck = existingSave.activeDeck;
        const currentCard = existingSave[activeDeck][activeCard]
        currentCard.setsCompleted ++
        localStorage.setItem('workout-thing-save', JSON.stringify(existingSave));
        fillCard(activeCard, activeDeck)
    }
    function decreaseSet(){
        const activeCard = existingSave.activeCard;
        const activeDeck = existingSave.activeDeck;
        const currentCard = existingSave[activeDeck][activeCard]
        if(currentCard.setsCompleted >= 1) {
            currentCard.setsCompleted--
        localStorage.setItem('workout-thing-save', JSON.stringify(existingSave));
        fillCard(activeCard, activeDeck)
        }
    }