const container = document.getElementById('container');
const text = document.getElementById('text');

const settingsContainer = document.getElementById('settings-container');
const settingsBtn = document.getElementById('settings-btn');
const breathIn = document.getElementById('breath-in');
const breathHold = document.getElementById('breath-hold');
const breathOut = document.getElementById('breath-out');
const buttonSubmit = document.getElementById('submit-btn');
const buttonClose = document.getElementById('close-btn');

const totalTime = 7500;
const resizeTime = (totalTime * 40) / 100;
const holdTime = (totalTime * 20) / 100;

const breathFunction = () => {
    text.textContent = 'Breath in';
    container.className = 'container grow';
    setTimeout(() => {
        text.textContent = 'Hold';
        setTimeout(() => {
            text.textContent = 'Breath out';
            container.className = 'container shrink';
        }, holdTime);
    }, resizeTime);
};

breathFunction();

setInterval(breathFunction, totalTime);

// Show/hide settings
settingsBtn.addEventListener('click', () => {
    settingsContainer.classList.toggle('show');
})