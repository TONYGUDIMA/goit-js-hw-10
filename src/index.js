import './css/styles.css'
import fetchCountires  from './fetchCountires'
import {Notify} from 'notiflix'
var _ = require('lodash')


const DEBOUNCE_DELAY = 300
const input = document.querySelector('#search-box')
const ul = document.querySelector('.country-list')
const div = document.querySelector('.country-info')


input.addEventListener('input', _.debounce(e => {
  e.preventDefault()
  ul.innerHTML = ''
  const trimmedInput = input.value.trim()
  const countriesArray = fetchCountires(trimmedInput)
  countriesArray.then(data => {
    if(data.length > 10) {
      Notify.info("Too many matches found. Please enter a more specific name.")
    } else if (data.length >= 2 && data.length <= 10 ) {
      data.forEach(el => {
        div.innerHTML = ''
        const li = document.createElement('li')
        const img = document.createElement('img')
        img.src = el.flag
        img.alt = el.name
        img.width = '40'
        const p = document.createElement('p')
        p.textContent = el.name
        li.append(img, p)
        ul.append(li)
      })
    } else {
      ul.innerHTML = ''
      data.forEach(el => {
        const allLanguages = el.languages.map(el => el.name)
        const li = 
        `
        <h1><img src="${el.flag}" alt="${el.name}"  width = 60 height = 36>${el.name}</h1>
        <h2>Capital : <span>${el.capital}</span></h2>
        <h2>Population : <span>${el.population}</span></h2>
        <h2>Languages : <span>${allLanguages}</span></h2>
        `
        div.innerHTML = li
      })
    }

  })
},DEBOUNCE_DELAY))





