import './css/styles.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import debounce from 'lodash.debounce';
import {Notify} from 'notiflix';
import { fetchCountries } from './js/fetchCountries';


const DEBOUNCE_DELAY = 300;
const inputElement = document.getElementById('search-box');
const countryListElement = document.querySelector('.country-list');
const countryInfoElement = document.querySelector('.country-info');
let prevValue = null;

inputElement.addEventListener('input', debounce(() => {
    inputElement.value = inputElement.value.trim()
    let value = inputElement.value;

    if (value === '') {
        clearCountries()
    }

    if (prevValue !== value && value !== '') {
        prevValue = value

        fetchCountries(value)
            .then(response => {
                if (response.length > 10) {
                    Notify.info("Too many matches found. Please enter a more specific name.")
                    clearCountries()
                    return
                }
                setCountry(response)
            })
            .catch(error => {
                Notify.failure("Oops, there is no country with that name")
                clearCountries()
            })
    }

}, DEBOUNCE_DELAY)) 



function setCountry(data) {
    clearCountries()
    if (data.length > 1) {
        setListOfCountries(data)
    } else {
        setSingleCountry(data)
    }
}



function setListOfCountries(data) {

        const countries = data.map(country => {
        const { flags, name } = country;
            return `<li style="display: flex; align-items: center; margin: 5px; list-style-type: none">
                        <img src='${flags.svg}' alt="${name.official}" style="width: 50px; margin-right: 5px"><span style="font-size: 20px">${name.official}</span>
                    </li>`
        })

        countryListElement.innerHTML = countries.join('')
}



function setSingleCountry(data) {

        const { flags, name, capital, population, languages } = data[0];

        const transformLanguages = Object.values(languages).join(',')

    countryInfoElement.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 10px">
                <img src='${flags.svg}' alt='${name.official}' style="width: 70px; margin-right: 5px"><span style="font-size: 40px; font-weight: 900">${name.official}</span>
            </div>
            <ul style="display:flex; flex-direction:column; margin:-5px; padding:0">
                <li style="margin:5px; list-style-type: none"><span style="font-weight: 700">Capital: </span>${capital}</li>
                <li style="margin:5px; list-style-type: none"><span style="font-weight: 700">Population: </span>${population}</li>
                <li style="margin:5px; list-style-type: none"><span style="font-weight: 700">Languages: </span>${transformLanguages}</li>
            </ul>
        `
}



function clearCountries() {
    countryInfoElement.innerHTML = '';
    countryListElement.innerHTML = '';
}