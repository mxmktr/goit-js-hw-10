import { fetchCountries } from './js/fetchCountries';
/* import debounce from '../node_modules/lodash.debounce'; */
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', onInput);

function onInput(event) {
  const searchCountries = event.currentTarget.value.trim();

  if (searchCountries == 0) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }

  if (searchCountries.length > 0) {
    fetchCountries(searchCountries)
      .then(countriesList => {
        let quantityOfCountries = countriesList.length;
        if (quantityOfCountries === 1) {
          countryList.innerHTML = countryListMarkup(countriesList);
          countryInfo.innerHTML = countryDetailsMarkup(countriesList);
        } else if (quantityOfCountries <= 10) {
          countryList.innerHTML = countryListMarkup(countriesList);
          countryInfo.innerHTML = '';
        } else {
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
          console.log(
            '"Too many matches found. Please enter a more specific name."'
          );
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}

function countryListMarkup(countriesList) {
  return countriesList.reduce(
    (base, country) =>
      `<li><img src=${country.flags.svg}><p>${country.name.common}</p></li>` +
      base,
    ''
  );
}

function countryDetailsMarkup(countriesList) {
  const { capital, population, languages } = countriesList[0];
  console.log(languages);
  return `<ul><li>Capital: ${capital}</li><li>Population: ${population}</li><li>Languages: ${languagesObjToString(
    languages
  )}</li><ul>`;
}

function languagesObjToString(languages) {
  let languagesArray = [];
  for (const key in languages) {
    if (Object.hasOwnProperty.call(languages, key)) {
      languagesArray.push(languages[key]);
    }
  }
  return languagesArray.join(', ');
}
