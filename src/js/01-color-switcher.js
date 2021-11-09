const colorType = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body'),
};
let bodyColorTimer = null;
colorType.stopBtn.setAttribute('disabled', true);

colorType.startBtn.addEventListener('click', onStartBtnClick);
colorType.stopBtn.addEventListener('click', onStopBtnClick);


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
};

function onStartBtnClick() {
    bodyColorTimer = setInterval(() => colorType.bodyEl.style.backgroundColor = getRandomHexColor(), 1000);
    colorType.startBtn.setAttribute('disabled', true);
    colorType.stopBtn.removeAttribute('disabled');
};

function onStopBtnClick() {
    clearInterval(bodyColorTimer);
    colorType.startBtn.removeAttribute('disabled');
    colorType.stopBtn.setAttribute('disabled', true);
};


