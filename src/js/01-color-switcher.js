/*
Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. 
Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. 
Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

Для генерування випадкового кольору використовуй функцію getRandomHexColor.
*/

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let intervalId;
// console.log(refs.start);
refs.start.addEventListener('click', startClick);
refs.stop.addEventListener('click', stopClick);

function startClick() {
  intervalId = setInterval(() => changeBackgroundColor(), 1000);
  refs.start.disabled = true;
  refs.stop.disabled = false;
}

function stopClick() {
  clearInterval(intervalId);
  refs.start.disabled = false;
  refs.stop.disabled = true;
}

function changeBackgroundColor() {
  return (document.body.style.backgroundColor = getRandomHexColor());
}
