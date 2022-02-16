import FetchWrapper from "./fetch-wrapper.js"

const API = new FetchWrapper("https://v6.exchangerate-api.com/v6/82fdb027659aadf1f807ca57")

const base = document.querySelector("#base-currency");
const result = document.querySelector("#conversion-result");
const input = document.querySelector('#input-number');


const getConversionRates = () => {
    if (!input.value) {
        input.value = 1;
    }
    API.get(`/latest/${base.value}`)
    .then(data => {
        if (input.value) {
            result.textContent = (data.conversion_rates['UAH'] * input.value).toFixed(2);
        } else {
            result.textContent = (data.conversion_rates['UAH']).toFixed(2);
        }
    });
}

const inputChangeHandler = (event) =>{
    if (!base.value){
        alert('Оберіть валюту')
    } else {
        API 
            .get(`/latest/${base.value}`)
            .then(data => {
                result.textContent = (data.conversion_rates['UAH'] * event.target.value).toFixed(2);
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