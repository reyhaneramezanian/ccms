import dayjs, { months, OpUnitType } from "dayjs";
import { LANGUAGES_OPTIONS } from "src/data/options";
import { object } from "yup/lib/locale";

export const phoneRegex = /^\+?[0-9]{8,15}$/;

export function toTitleCase(str) {
  try {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  } catch {
    return null
  }
}


export const extractLanguage = (language: string) => {
  try {
    const array = language.split(',')
    let outPut = ''
    array.map(item => {
      const lang = LANGUAGES_OPTIONS.find(object => {
        return object.value == item
      }).optionName
      if (outPut == '') {
        outPut += `${lang}`
      } else {
        outPut += `, ${lang}`
      }
    })

    return outPut
  } catch {
    return ''
  }
}


export const extractDate = (date: string, value:number = 0, key: OpUnitType = 'months') => {
  try {
    let dateArray = dayjs(date)
    dateArray = dateArray.add(value,key)
    const pattern = new RegExp('\\S{3}\\s\\d{2}\\s\\d{4}')
    return pattern.exec(dateArray['$d'])[0]
  } catch {
    return ''
  }
}

