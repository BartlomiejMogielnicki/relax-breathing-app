const container = document.getElementById('container');
const text = document.getElementById('text');

const settingsContainer = document.getElementById('settings-container');
const settingsForm = document.getElementById('settings-form');
const settingsBtn = document.getElementById('settings-btn');
const breathIn = document.getElementById('breath-in');
const breathHold = document.getElementById('breath-hold');
const breathOut = document.getElementById('breath-out');
const buttonSubmit = document.getElementById('submit-btn');

const dot = document.getElementById('dot-container');
const gradient = document.getElementById('gradient-circle');

let breathInTime, breathHoldTime, breathOutTime;

// Get local storage data
const getLocalStorage = () => {
    // Get time values
    const breathTime = JSON.parse(localStorage.getItem('breathTime'));
    if (breathTime !== null) {
        breathInTime = breathTime[0];
        breathHoldTime = breathTime[1];
        breathOutTime = breathTime[2];
    } else {
        breathInTime = 3;
        breathHoldTime = 1.5;
        breathOutTime = 3;
    }
    // Get color passes
    const colorPasses = JSON.parse(localStorage.getItem('colorPasses'));

    gradient.style.backgroundImage = `conic-gradient(#20C5E8 0%, #20C5E8 ${colorPasses[0]}%, #fff ${colorPasses[0]}%, #fff ${colorPasses[1]}%, #2297F2 ${colorPasses[1]}%, #2297F2 100%)`;
}

// Show values in settings
const updateSettingsValues = () => {
    breathIn.value = breathInTime;
    breathHold.value = breathHoldTime;
    breathOut.value = breathOutTime;
}

getLocalStorage();
updateSettingsValues();

let totalTime = breathInTime + breathHoldTime + breathOutTime;

// Update circle gradient
const updateColors = () => {
    const firstPass = Math.floor((breathInTime / totalTime) * 100);
    const secondPass = Math.floor((breathInTime + breathHoldTime) / totalTime * 100);
    const colorPasses = [firstPass, secondPass];

    gradient.style.backgroundImage = `conic-gradient(#20C5E8 0%, #20C5E8 ${colorPasses[0]}%, #fff ${colorPasses[0]}%, #fff ${colorPasses[1]}%, #2297F2 ${colorPasses[1]}%, #2297F2 100%)`;

    localStorage.setItem('colorPasses', JSON.stringify(colorPasses));
}

updateColors();

// Update dot animation
const updateDotAnimation = () => {
    dot.style.animationDuration = `${totalTime}s`;
}

updateDotAnimation();

// Breathing function
const breathFunction = () => {

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

// Update time values
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
settingsForm.addEventListener('submit', () => {
    updateTimeValues();
    updateColors();
    updateDotAnimation();
    breathFunction();
})