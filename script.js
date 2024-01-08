'use strict';
const arrow = document.querySelector('.submit__arrow');
const inputUserArr = document.querySelectorAll('.form__input');

const inputDay = document.querySelector('#form__input-day');
const inputMonth = document.querySelector('#form__input-month');
const inputYear = document.querySelector('#form__input-year');

const errorLabelArray = [...document.querySelectorAll('.error-message')];

const currentYear = new Date().getUTCFullYear();
const currentYearLength = currentYear.toString().length;

const errorMessage = function () {
  inputUserArr.forEach(data => {
    if (!data.value) {
      data.previousElementSibling.classList.add('text-color-red');
      data.nextElementSibling.textContent = 'This field is required';
      data.classList.add('red-border');

      setTimeout(() => {
        data.previousElementSibling.classList.remove('text-color-red');
        data.nextElementSibling.textContent = '';
        data.classList.remove('red-border');
      }, 5000);
    }
  })
}

const getMonthTotalDay = function (year, month) {
  return new Date(year, month, 1);
}

const checkValues = function () {
  inputUserArr.forEach(data => {

    if (document.querySelector(`#${data.id}`) === inputDay) {
      // const actualMonthValue =

      const totalDaysInMonth = getMonthTotalDay(+inputYear.value, +inputMonth.value).getUTCDate();

      if (+inputDay.value < 0) inputDay.nextElementSibling.textContent = 'Must be a valid day';
      if (+inputDay.value > totalDaysInMonth) inputDay.nextElementSibling.textContent = 'Must be a valid day';

      setTimeout(() => {
        inputDay.nextElementSibling.textContent = '';
      }, 5000);

    }

    if (document.querySelector(`#${data.id}`) === inputMonth) {
      if (+inputMonth.value > 12 || +inputMonth.value < 0) inputMonth.nextElementSibling.textContent = 'Must be a valid month';

      setTimeout(() => {
        inputMonth.nextElementSibling.textContent = '';
      }, 5000);
    }

    if (document.querySelector(`#${data.id}`) === inputYear) {
      if (+inputYear.value > currentYear) inputYear.nextElementSibling.textContent = 'Must be in the past';
      if (inputYear.value.length !== currentYearLength) inputYear.nextElementSibling.textContent = 'Must be a valid year';

      setTimeout(() => {
        inputYear.nextElementSibling.textContent = '';
      }, 5000);
    }
  })
}

const updateResult = function (year, month, day) {
  document.querySelector('.form__result-content--1 > span').textContent = year;
  document.querySelector('.form__result-content--2 > span').textContent = month;
  document.querySelector('.form__result-content--3 > span').textContent = day;
}

// Event Listener Submit
arrow.addEventListener('click', function () {
  checkValues();
  errorMessage();

  const filterLabelArr = errorLabelArray.filter(label => label.textContent !== ''); 4
  if (filterLabelArr.length > 0) return;

  const date = new Date();
  const calcDays = Math.abs(date.getUTCDate() - +inputDay.value);
  const calcMonths = date.getUTCMonth() - +inputMonth.value;
  const calcYears = date.getUTCFullYear() - +inputYear.value;

  // render age
  if (calcMonths < -1) {
    const absYear = calcYears - 1;
    const absMonth = 12 - Math.abs(calcMonths);
    updateResult(absYear, absMonth, calcDays);
  } else {
    updateResult(calcYears, calcMonths, calcDays);
  }

  inputDay.value = inputMonth.value = inputYear.value = '';
})

inputDay.addEventListener('focus', function () {
  updateResult('--', '--', '--');
})

console.log(new Date().getUTCMonth() - 3);