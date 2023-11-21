/*
HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку в мілісекундах, 
крок збільшення затримки для кожного промісу після першого і кількість промісів, яку необхідно створити.

Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount. 
Під час кожного виклику передай їй номер промісу (position), що створюється, і затримку, 
враховуючи першу затримку (delay), введену користувачем, і крок (step).

Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється через delay часу. 
Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів. 
Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.

Для відображення повідомлень користувачеві, замість console.log(), використовуй бібліотеку notiflix.
*/

import Notiflix from 'notiflix';

const promiseForm = document.querySelector('.form');

let delay = 0;

promiseForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const amount = Number(form.elements.amount.value);
  const step = Number(form.elements.step.value);
  delay = Number(form.elements.delay.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
