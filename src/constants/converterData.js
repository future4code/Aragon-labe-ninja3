import react from "react";

export const converterDataStr = (date) => {
    const formDate = new Date(date).toISOString().replace(/T/, ' ').replace(/\..+/, '')
    // const day = date.substring(8, 10)
    // const month = date.substring(5, 7)
    // const year = date.substring(0, 4)
    // return `${day}/${month}/${year}`
    return formDate
}