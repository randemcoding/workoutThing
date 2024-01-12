document.addEventListener('DOMContentLoaded', function () {
    const mainContainer = document.getElementById('main-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    prevButton.hidden = true;
    nextButton.hidden = true;

    function checkActiveCard() {
        let activeCard = localStorage.getItem('workout-thing-active-card') || 0;
        let saveArray = JSON.parse(localStorage.getItem('workout-thing-save')) || [];

        if (saveArray.length === 0) {
            mainContainer.innerHTML = `<div class="card"><p class="card-text">No Cards</p></div>`;
            prevButton.hidden = true;
            nextButton.hidden = true;
        } else {
            mainContainer.innerHTML = `
                <div class="card">
                    <button id="tally-plus-button">+</button>
                    <p id="card-top-line" class="card-text">${saveArray[activeCard].workoutName}</p>
                    <p class="card-text">Rep Range: ${saveArray[activeCard].repRange}</p>
                    <p class="card-text">Weight: ${saveArray[activeCard].weightRange}</p>
                    <p class="card-text">Set Goal: ${saveArray[activeCard].setGoal} Sets</p>
                    <p id="sets-completed">${saveArray[activeCard].setsCompleted}</p>
                    <button id="tally-minus-button">-</button>
                </div>`;

            // Update button visibility
            prevButton.hidden = activeCard === 0;
            nextButton.hidden = activeCard === saveArray.length - 1;

            // Add event listeners for tally buttons
            const tallyPlusButton = document.getElementById('tally-plus-button');
            const tallyMinusButton = document.getElementById('tally-minus-button');

            tallyPlusButton.addEventListener('click', function () {
                incrementSetsCompleted(activeCard);
            });

            tallyMinusButton.addEventListener('click', function () {
                decrementSetsCompleted(activeCard);
            });
        }
    }

    function saveCard() {
        const workoutNameInput = document.getElementById('workout-name-input');
        const repRangeInput = document.getElementById('rep-range-input');
        const weightRangeInput = document.getElementById('weight-range-input');
        const setGoalInput = document.getElementById('set-goal-input');
        const tempArray = JSON.parse(localStorage.getItem('workout-thing-save')) || [];
        const tempSaveObject = {
            workoutName: workoutNameInput.value,
            repRange: repRangeInput.value,
            weightRange: weightRangeInput.value,
            setGoal: setGoalInput.value,
            setsCompleted: 0
        };
        tempArray.push(tempSaveObject);
        localStorage.setItem('workout-thing-save', JSON.stringify(tempArray));
        checkActiveCard();
    }

    function incrementSetsCompleted(activeCard) {
        let saveArray = JSON.parse(localStorage.getItem('workout-thing-save')) || [];
        saveArray[activeCard].setsCompleted++;
        localStorage.setItem('workout-thing-save', JSON.stringify(saveArray));
        checkActiveCard();
    }

    function decrementSetsCompleted(activeCard) {
        let saveArray = JSON.parse(localStorage.getItem('workout-thing-save')) || [];
        if (saveArray[activeCard].setsCompleted > 0) {
            saveArray[activeCard].setsCompleted--;
            localStorage.setItem('workout-thing-save', JSON.stringify(saveArray));
            checkActiveCard();
        }
    }

    const addSetCardButton = document.getElementById('add-a-card-button');
    const popUp = document.getElementById('pop-up-container');

    addSetCardButton.addEventListener('click', function () {
        popUp.style.zIndex = 1;
        const exitButton = document.getElementById('exit-button');
        exitButton.addEventListener('click', function () {
            popUp.style.zIndex = -1;
        });
        const saveButton = document.getElementById('save-button');
        saveButton.addEventListener('click', function () {
            saveCard();
            popUp.style.zIndex = -1;
        });
    });

    prevButton.addEventListener('click', function () {
        let activeCard = localStorage.getItem('workout-thing-active-card') || 0;
        localStorage.setItem('workout-thing-active-card', Math.max(0, activeCard - 1));
        checkActiveCard();
    });

    nextButton.addEventListener('click', function () {
        let activeCard = localStorage.getItem('workout-thing-active-card') || 0;
        let saveArray = JSON.parse(localStorage.getItem('workout-thing-save')) || [];
        localStorage.setItem('workout-thing-active-card', Math.min(activeCard + 1, saveArray.length - 1));
        checkActiveCard();
    });

    // Initial check and display
    checkActiveCard();

    const popup = document.getElementById('pop-up-container');
    const editCardButton = document.getElementById('edit-card-button');
    let saveArray = JSON.parse(localStorage.getItem('workout-thing-save')) || [];
    let activeCard = localStorage.getItem('workout-thing-active-card') || 0;

    if (saveArray.length <= 1) {
        editCardButton.hidden = true;
    } else {
        editCardButton.addEventListener('click', editCard);
    }

    function editCard() {
        popup.style.zIndex = 1;
        const workoutNameInput = document.getElementById('workout-name-input');
        const repRangeInput = document.getElementById('rep-range-input');
        const weightRangeInput = document.getElementById('weight-range-input');
        const setGoalInput = document.getElementById('set-goal-input');
        const setsCompleted = document.getElementById('sets-completed');
        const exitButton = document.getElementById('exit-button');

        // Update the values of the active card in the saveArray
        workoutNameInput.value = saveArray[activeCard].workoutName;
        repRangeInput.value = saveArray[activeCard].repRange;
        weightRangeInput.value = saveArray[activeCard].weightRange;
        setGoalInput.value = saveArray[activeCard].setGoal;
        exitButton.addEventListener('click', function () {
            popUp.style.zIndex = -1;
        });
        // Add event listener for the "Save" button in the edit popup
        const saveButton = document.getElementById('save-button');
        saveButton.addEventListener('click', function () {
            saveArray[activeCard].workoutName = workoutNameInput.value;
            saveArray[activeCard].repRange = repRangeInput.value;
            saveArray[activeCard].weightRange = weightRangeInput.value;
            saveArray[activeCard].setGoal = setGoalInput.value;
            saveArray[activeCard].setsCompleted = setsCompleted.innerText;

            // Save the modified array back to localStorage
            localStorage.setItem('workout-thing-save', JSON.stringify(saveArray));
            popUp.style.zIndex = -1;
            // Update the display
            checkActiveCard();
        });
    }
    
});
const header = document.getElementById('header-text');
header.addEventListener('contextmenu', function(event){
    event.preventDefault();
localStorage.removeItem('workout-thing-save')
localStorage.removeItem('workout-thing-active-card')
window.location.reload();
})

// Define popup here





//localStorage.removeItem('workout-thing-active-card')
const clearCardsButton = document.getElementById('clear-cards-button')
clearCardsButton.addEventListener('click', function (){
localStorage.removeItem('workout-thing-save')
localStorage.removeItem('workout-thing-active-card')
})

