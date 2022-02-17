import FetchWrapper from "./fetch-wrapper.js"

const API = new FetchWrapper("https://v6.exchangerate-api.com/v6/82fdb027659aadf1f807ca57")

const base = document.querySelector("#base-currency");
const result = document.querySelector("#conversion-result");
const input = document.querySelector('#input-number');
const paragraph = document.createElement('p');
paragraph.classList.add('warning');
const currency_warning = document.createTextNode('Оберіть валюту.');
const main_input = document.querySelector('#main-input');
const limit_warning = document.createTextNode('Значення занадто велике. \n');
const characters_warning = document.createTextNode('Видаліть сторонні символи або введіть значення. \n');


const getConversionRates = () => {
    if (!input.value) {
        input.value = 1;
    }
    if (base.value) {
        if (document.querySelector('.warning')) {
            document.querySelector('.warning').innerHTML = '';
        }
    }

    API.get(`/latest/${base.value}`)
    .then(data => {
        if (input.value) {
            Math.abs(result);
            result.textContent = (data.conversion_rates['UAH'] * input.value).toFixed(2) + ' ₴';
        } else {
            Math.abs(result);
            result.textContent = (data.conversion_rates['UAH']).toFixed(2) + ' ₴';
        }
    });
}

const inputChangeHandler = (event) => {
    if (!base.value){
        paragraph.appendChild(currency_warning);
        main_input.appendChild(paragraph);
    } else if (input.value.length > 9) {
        paragraph.appendChild(limit_warning);
        main_input.appendChild(paragraph);
    } else if (input.value < 0) {
        input.value = Math.abs(input.value);
    } else if (!input.value.match(/^\d+$/)) {
        paragraph.appendChild(characters_warning);
        main_input.appendChild(paragraph);
    } else {
        if (document.querySelector('.warning')) {
            document.querySelector('.warning').innerHTML = '';
        }
        API 
            .get(`/latest/${base.value}`)
            .then(data => {
                Math.abs(result);
                result.textContent = (data.conversion_rates['UAH'] * event.target.value).toFixed(2) + ' ₴';
            });
    }
}

base.addEventListener('change', getConversionRates);

let delayTimer;
input.addEventListener('keyup', function(event){
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function(){
        inputChangeHandler(event);
    }, 400);
});
input.addEventListener('change', inputChangeHandler);