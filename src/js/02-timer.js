import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
let date;
const dateRef = {
    startBtn: document.querySelector('button[data-start]'),
    dayEl: document.querySelector('span[data-days]'),
    hourEl: document.querySelector('span[data-hours]'),
    minEl: document.querySelector('span[data-minutes]'),
    secEl: document.querySelector('span[data-seconds]'),
};

dateRef.startBtn.setAttribute('disabled', true);
dateRef.startBtn.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      date = selectedDates[0];
      if (date > Date.now()) {
          dateRef.startBtn.removeAttribute('disabled');
      }
      else {
          Notify.failure('Please choose a date in the future');
          dateRef.startBtn.setAttribute('disabled', true);
      }
  },
};
flatpickr('input#datetime-picker', options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const hours = Math.floor((ms % day) / hour);
    const days = Math.floor(ms / day);
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function onStartBtnClick() {
    setInterval(() => {
        if (date <= Date.now())
            return;
        const currentTime = convertMs(date - Date.now());

        dateRef.secEl.textContent = addLeadingZero(currentTime.seconds);
        dateRef.minEl.textContent = addLeadingZero(currentTime.minutes);
        dateRef.hourEl.textContent = addLeadingZero(currentTime.hours);
        dateRef.dayEl.textContent = addLeadingZero(currentTime.days);
    }, 1000)
}




