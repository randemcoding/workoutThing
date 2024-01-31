//localStorage.removeItem('workout-thing-save')
import { fillCard, checkButtons, saveNewCard, getExistingSave, editCard} from "./funky.js";


const existingSave = await getExistingSave()

let activeCard = existingSave.activeCard; 
let activeDeck = existingSave.activeDeck;
const mainContainer = document.getElementById('main-container');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const editCardButton = document.getElementById('edit-card-button');
const saveButton = document.getElementById('save-button');
const exitButton = document.getElementById('exit-button');

if(existingSave){
    fillCard(activeCard, activeDeck);
    checkButtons()
} else {
    mainContainer.innerHTML = `<div class="card"><p class="card-text">No Cards</p></div>`;
prevButton.hidden = true;
nextButton.hidden = true;
editCardButton.hidden = true;
}

const addCardButton = document.getElementById('add-a-card-button');
addCardButton.addEventListener('click', function(){
    const popUp = document.getElementById('pop-up-container');
    popUp.style.zIndex = 3;
    saveButton.addEventListener('click', saveNewCard);
    exitButton.addEventListener('click', function (){
        popUp.style.zIndex = `-1`;
    })
})
editCardButton.addEventListener('click', editCard);
