
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const timerValues = {
    days: document.querySelector(".timer [data-days]"),
    hours: document.querySelector(".timer [data-hours]"),
    minutes: document.querySelector(".timer [data-minutes]"),
    seconds: document.querySelector(".timer [data-seconds]"),
};

let intervalId = null;

startBtn.setAttribute("disabled", true);

const datePickerOptions = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    dateFormat: 'd-m-Y H:i',
    onClose(selectedDates) {
        return checkDate(selectedDates)
    },
};

flatpickr(datePicker, datePickerOptions);

function checkDate(selectedDates) {
    const currentDateSec = (new Date()).getTime();
    const selectedDate = selectedDates[0].getTime();

    if (currentDateSec >= selectedDate) {
        return Notify.failure('Please choose a date in the future');
    }

    startBtn.removeAttribute("disabled");

    const onStartBtnClick = () => {
        startBtn.setAttribute("disabled", true);
        datePicker.setAttribute("disabled", true);

        intervalId = setInterval(onChooseDate, 1000, selectedDate)
    }

    startBtn.addEventListener('click', onStartBtnClick);
}

function onChooseDate(selectedDate) {
    const currentDateSec = (new Date()).getTime();

    if (currentDateSec >= selectedDate) {
        clearInterval(intervalId);
        datePicker.removeAttribute("disabled");
        return;
    }

    const timerValuesConv = convertMs(selectedDate - currentDateSec);
    
    const updateTimerValue = value => {
        timerValues[value].textContent = addLeadingZero(timerValuesConv[value]);
    };

    Object.keys(timerValues).forEach(updateTimerValue);
console.log(currentDateSec);
};

function addLeadingZero(value) {
    return value.toString().padStart(2,"0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
