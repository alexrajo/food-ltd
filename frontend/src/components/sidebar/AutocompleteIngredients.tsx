import Select from 'react-select'
import { useAppSelector } from 'src/hooks/useAppRedux'
import { colors } from 'src/utils/constants'

type ComponentProps = {
  /** Whether the data is loading */
  isLoading: boolean
  /** The ingredients to display */
  parsedIncludedIngredients: { [key: string]: number }
  /** The function to call when the user selects an ingredient */
  onChange: (e: any) => void
}
export default function AutocompleteIngredients(props: ComponentProps) {
  const { isLoading, parsedIncludedIngredients, onChange } = props

  const colorMode = useAppSelector((state) => state.theme.value)

  /** The list of ingredients to display */
  const list = isLoading
    ? []
    : Object.keys(parsedIncludedIngredients)
        .map((key, index) => ({
          name: key,
          id: index,
          count: parsedIncludedIngredients[key],
        }))
        .filter((i) => i.count > 0)

  return (
    <Select
      options={list}
      getOptionLabel={(option) =>
        `${option!.name} ${
          isLoading ? '' : '(' + parsedIncludedIngredients[option!.name] + ')'
        }`
      }
      getOptionValue={(option) => option!.name}
      isLoading={isLoading}
      onChange={onChange}
      escapeClearsValue
      value={null}
      placeholder='Search for ingredients'
      autoFocus
      styles={{
        menu: (provided) => ({
          ...provided,
          zIndex: 9999,
          backgroundColor: 'black',
        }),
        menuList: (provided) => ({
          ...provided,
          zIndex: 9999,
          backgroundColor: colorMode == 'dark' ? colors.tertiarydark : 'white',
        }),
        option: (provided, state) => ({
          ...provided,
          // color: state.isSelected ? 'white' : 'black',
          color: colorMode == 'dark' ? 'white' : 'black',
          backgroundColor: state.isSelected
            ? colors.tertiarydark
            : 'transparent',
          '&:hover': {
            backgroundColor: colors.tertiarydark,
            color: 'black',
          },
        }),
      }}
      className='z-999 '
    />
  )
}
