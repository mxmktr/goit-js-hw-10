import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const options = { timeout: 2000 };

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener(
  'input',
  debounce(onInput, DEBOUNCE_DELAY, { leading: true })
);

function onInput(event) {
  if (!event.currentTarget) {
    countryListReset();
    countryInfoReset();
    return;
  }

  const searchCountries = event.currentTarget.value.trim();

  if (searchCountries.length > 0) {
    fetchCountries(searchCountries)
      .then(countriesList => {
        let quantityOfCountries = countriesList.length;
        if (quantityOfCountries === 1) {
          countryList.innerHTML = countryListMarkup(countriesList);
          countryInfo.innerHTML = countryDetailsMarkup(countriesList);
          markupStyle();
        } else if (quantityOfCountries <= 10) {
          countryList.innerHTML = countryListMarkup(countriesList);
          countryInfoReset();
        } else {
          countryListReset();
          countryInfoReset();
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.',
            options
          );
        }
      })
      .catch(() => {
        Notiflix.Notify.failure(
          'Oops, there is no country with that name',
          options
        );
      });
  }
}

function markupStyle() {
  const countryListParagraphe = document.querySelector('.country-list p');
  countryListParagraphe.style.fontSize = '25px';
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
  return `<ul><li><span>Capital:</span> ${capital}</li><li><span>Population:</span> ${population}</li><li><span>Languages:</span> ${languagesObjToString(
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

function countryListReset() {
  countryList.innerHTML = '';
}

function countryInfoReset() {
  countryInfo.innerHTML = '';
}
