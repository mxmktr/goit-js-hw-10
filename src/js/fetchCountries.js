const URL = 'https://restcountries.com/v3.1/name/';
/* params of request */
const name = 'name';
const capital = 'capital';
const population = 'population';
const flags = 'flags';
const languages = 'languages';

export function fetchCountries(searchCountries) {
  return fetch(
    `${URL}${searchCountries}?fields=${name},${capital},${population},${flags},${languages}`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return response.json();
  });
}
