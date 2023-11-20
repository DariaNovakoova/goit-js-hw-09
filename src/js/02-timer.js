/*
Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. 
Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо.

HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на яку, таймер повинен запускатися.
Додай мінімальне оформлення елементів інтерфейсу.

Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу. 
*/
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  startButton: document.querySelector('button[data-start]'),
};

let selectTime = null;
let currTime = null;
let timerId = null;

refs.startButton.disabled = true;
refs.startButton.addEventListener('click', clickStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dataSelectedInput(selectedDates);
  },
};
flatpickr('#datetime-picker', options);

function dataSelectedInput(selectedDates) {
  selectTime = selectedDates[0].getTime();
  currTime = Date.now();
  if (selectTime < currTime) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.startButton.disabled = false;
  }
}

function clickStart() {
  refs.inputDate.disabled = true;
  refs.startButton.disabled = true;

  timerId = setInterval(() => {
    currTime = Date.now();
    const delTime = selectTime - currTime;
    if (selectTime <= currTime) {
      clearInterval(timerId);
      Notiflix.Notify.success('DONE');
      return;
    }
    const convertTime = convertMs(delTime);
    visualTime(convertTime);
  }, 1000);
}

function visualTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
