import _ from 'lodash'
import { Notify } from 'notiflix'


export default function fetchCountires(name) {
  if(name === '') {
    return
  }
  const url = `https://restcountries.com/v2/name/${name}`
  const promise = 
  fetch(url)
  .then(response => response.json())
  .then(data => data.map(el => {
    const {
      name,
      capital,
      population,
      flag,
      languages
    } = el
    return {name, capital, population, flag, languages}
  }))
  .catch(error => Notify.failure("Oops, there is no country with that name"))
  return promise
}