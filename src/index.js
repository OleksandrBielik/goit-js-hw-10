import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputElement = document.getElementById('search-box');

inputElement.addEventListener('input', debounce(() => {
    fetchCountries(inputElement.value)
}, DEBOUNCE_DELAY)) 



