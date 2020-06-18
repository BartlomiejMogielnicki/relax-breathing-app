const container = document.getElementById('container');
const text = document.getElementById('text');

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