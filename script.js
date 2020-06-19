const container = document.getElementById('container');
const text = document.getElementById('text');

const settingsContainer = document.getElementById('settings-container');
const settingsForm = document.getElementById('settings-form');
const settingsBtn = document.getElementById('settings-btn');
const breathIn = document.getElementById('breath-in');
const breathHold = document.getElementById('breath-hold');
const breathOut = document.getElementById('breath-out');
const buttonSubmit = document.getElementById('submit-btn');
const buttonClose = document.getElementById('close-btn');

const dot = document.getElementById('dot-container');

let breathInTime, breathHoldTime, breathOutTime;

// Show values in settings
const updateSettingsValues = () => {
    breathIn.value = breathInTime;
    breathHold.value = breathHoldTime;
    breathOut.value = breathOutTime;
}

// Get local storage data
const getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('breathTime'));
    console.log(data);
    if (data !== null) {
        breathInTime = data[0];
        breathHoldTime = data[1];
        breathOutTime = data[2];
    } else {
        breathInTime = 3;
        breathHoldTime = 1.5;
        breathOutTime = 3;
    }
}

getLocalStorage();
updateSettingsValues();

let totalTime = breathInTime + breathHoldTime + breathOutTime;

// Update dot animation
const updateDotAnimation = () => {
    dot.style.animationDuration = `${totalTime}s`;
}

updateDotAnimation();

// Update circle gradient
const updateUI = () => {

}

const breathFunction = () => {
    updateUI();
    text.textContent = 'Breath in';
    container.className = 'container grow';
    const containerGrow = document.querySelector('.container.grow').style.animationDuration = `${breathInTime}s`;
    setTimeout(() => {
        text.textContent = 'Hold';
        setTimeout(() => {
            text.textContent = 'Breath out';
            container.className = 'container shrink';
            const containerShrink = document.querySelector('.container.shrink').style.animationDuration = `${breathOutTime}s`
        }, (breathHoldTime * 1000));
    }, (breathOutTime * 1000));
};

setInterval(breathFunction, (totalTime * 1000));

breathFunction();

// Set local storage
const setLocalStorage = () => {
    let timesArr = [breathInTime, breathHoldTime, breathOutTime];
    localStorage.setItem('breathTime', JSON.stringify(timesArr));
}

// Submit form and update time values
const updateTimeValues = () => {
    breathInTime = parseInt(breathIn.value);
    breathHoldTime = parseInt(breathHold.value);
    breathOutTime = parseInt(breathOut.value);
    totalTime = breathInTime + breathHoldTime + breathOutTime;
    setLocalStorage();
}

// Show/hide settings
settingsBtn.addEventListener('click', () => {
    settingsContainer.classList.toggle('show');
});

// Submit settings form
settingsForm.addEventListener('submit', (e) => {
    updateTimeValues();
    updateDotAnimation();
    breathFunction();
})