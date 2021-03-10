export const camelToLispCase = str => str.replace(
  /[A-Z]/g, letter => `-${letter.toLowerCase()}`
)
