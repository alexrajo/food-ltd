const ABBREVIATION_ALIASES = {
  'Tbsp.': 'Tbsp@',
  'tbsp.': 'tbsp@',
  'Tbsps.': 'Tbsps@',
  'tbsps.': 'tbsps@',
  'Tsp.': 'Tsp@',
  'tsp.': 'tsp@',
  'Tsps.': 'Tsps@',
  'tsps.': 'tsps@',
  'Oz.': 'Oz@',
  'oz.': 'oz@',
}

/**
 * Converts a text containing a Fahrenheit temperature to Celsius.
 * @param text the text to convert
 * @returns the text with the Fahrenheit temperature converted to Celsius
 */
export const fahrenheitTextToCelsius = (text: string) => {
  // Find the Fahrenheit temperature in the text and convert it to Celsius
  const fahrenheitMatchRegex = /\d+\s?°[F]/g
  const matches = text.match(fahrenheitMatchRegex)

  if (matches) {
    const splitString = text.split(fahrenheitMatchRegex)
    const celsiusValues = matches.map((match) => {
      const fahrenheitValue = parseInt(match, 10)
      const celsiusCalc = Math.floor(((fahrenheitValue - 32) * 5) / 9)

      return celsiusCalc
    })
    let finalString = ''
    for (let i = 0; i < splitString.length; i++) {
      finalString += splitString[i]
      if (i < celsiusValues.length) {
        finalString += `${celsiusValues[i]}°C`
      }
    }
    return finalString
  }
  return text
}

/**
 * Turns a string of instructions into a list of instructions.
 * @param instructions the instructions text to turn into a list
 * @returns the instructions as a list of JSX elements
 */
export const listifyInstructions = (
  instructions?: string,
  temperatureUnit?: string,
) => {
  if (instructions === undefined) {
    return undefined
  }

  let instr = instructions
  Object.entries(ABBREVIATION_ALIASES).forEach(([key, value]) => {
    const regex = new RegExp(key, 'g')
    instr = instr!.replace(regex, value)
  })

  const splitInstructions = instr.split(/\.(?: |\n)/g)

  return splitInstructions.map((instruct, index) => {
    const instruction =
      temperatureUnit === 'celsius'
        ? fahrenheitTextToCelsius(instruct)
        : instruct

    return `${index + 1}. ${instruction.replace(/@/g, '.')}${
      index !== splitInstructions.length - 1 ? '.' : ''
    }`
  })
}
