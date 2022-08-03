import { helpers } from "vuelidate/lib/validators"

const cyrillic = helpers.regex('cyrillic', /^[ а-яА-ЯёЁ-]*$/)
const date = helpers.regex('date', /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/)
const snils = helpers.regex('snils', /^\d{3}-\d{3}-\d{3} \d{2}$/)
const setOfSymbols = helpers.regex('setOfSymbols', /^[ а-яА-ЯёЁA-Za-z0-9.,-:;№\_\(\)]*$/)
const cellularPhone = helpers.regex('cellularPhone', /^\+ \[0-9]{16}$/)
const meanScore = helpers.regex('meanScore', /^[3-5]{1}\.[0-9]{3}$/)

const daysRegex = helpers.regex('daysRegex', /^[0-9]$|^[1-9]\d$|^[1-2]\d{2}$|^3[0-5]\d$|^36[0-5]$/)
const hoursRegex = helpers.regex('hoursRegex', /^\d$|^1\d$|^2[0-3]$/)
const secondsMinutesRegex = helpers.regex('secondsMinutesRegex', /^\d$|^[1-5]\d$/)


const checkSnilsSum = snils => {
  let sum = 0
  let checkDigit = 0

  if (!!snils) {
    snils = snils.replace(/-/g, '')
  } else {
    return true
  }

  for (let i = 0; i < 9; i++) {
    sum += parseInt(snils[i]) * (9 - i)
  }

  if (sum < 100) {
    checkDigit = sum
  } else if (sum > 101) {
    checkDigit = parseInt(sum % 101)
    if (checkDigit === 100) {
      checkDigit = 0
    }
  }

  return checkDigit === parseInt(snils.slice(-2))
}

const egeScore = value => +value === 0 || (+value >= 40 && +value <= 100)
const ebeScore = value => +value === 0 || (+value >= 40 && +value <= 100)

export {
  cyrillic,
  date,
  snils,
  setOfSymbols,
  cellularPhone,
  meanScore,
  checkSnilsSum,
  egeScore,
  ebeScore,
  daysRegex,
  hoursRegex,
  secondsMinutesRegex
}