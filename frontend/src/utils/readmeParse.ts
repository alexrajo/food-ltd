export type Subsection = {
  subtitle: string
  content: string
}

export type Section = {
  title: string
  subsections: Subsection[]
}

/**
 *
 * @param content of a readme file. Splits into sections and subsections and creates an array of objects
 * @returns Array of Section object created from input. Note that content does not include headers
 */
export const readmeParser = (content: string): Section[] => content.split(/\n(?=##\s)/).map((section) => {
    const title = section.substring(section.indexOf(' '), section.indexOf('\n'))
    const body = section.substring(section.indexOf('###'))

    const subsections: Subsection[] = body.split(/\n(?=###\s)/).map((subsection) => {
        const subtitle = subsection.substring(subsection.indexOf(' '), subsection.indexOf('\n'))
        const subsectionContent = subsection
        return {
            subtitle, 
            content: subsectionContent
        }
    })
    return { title, subsections }
  })

