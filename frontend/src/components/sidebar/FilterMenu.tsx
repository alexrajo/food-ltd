import menu from 'src/assets/burgermenu.svg'
import x from 'src/assets/x.svg'
import add from 'src/assets/add-plus-white.svg'
import meat from 'src/assets/meat.svg'
import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppRedux'
import { closeFilterMenu, setClosed } from 'src/redux/modalsReducer'
import {
  excludeFilter,
  includeFilter,
  removeExcludedFilter,
  removeIncludedFilter,
} from 'src/redux/confinementReducer'
import { INGREDIENTS, colors } from 'src/utils/constants'
import Autosuggest from 'react-autosuggest'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import {
  FetchIngredientFilterCountsResponse,
  fetchIngredientFilterCounts,
} from 'src/utils/api-calls'
import useSearch from 'src/hooks/useSearch'
import { useQuery } from '@tanstack/react-query'
import searchIcon from 'src/assets/searchIcon.svg'
import Select from 'react-select'

/**
 * For holding the different filters on the right side
 */

export default function FilterMenu() {
  const open = useAppSelector((state) => state.modals.filterMenu)

  const menuClass = open
    ? 'translate-y-0 md:translate-x-0'
    : 'translate-y-full md:translate-x-full'

  const colorMode = useAppSelector((state) => state.theme.value)

  const searchInput = useAppSelector((state) => state.confinements.keyWord)

  const includedIngredients = useAppSelector(
    (state) => state.confinements.includedIngredients,
  )
  const excludedIngredients = useAppSelector(
    (state) => state.confinements.excludedIngredients,
  )

  /** Fetch the data from the api */
  const {
    isLoading,
    error,
    data: ingredientCount,
  } = useQuery({
    queryKey: [
      'ingredientCounts',
      searchInput,
      includedIngredients,
      excludedIngredients,
    ],
    queryFn: () =>
      fetchIngredientFilterCounts(
        searchInput,
        excludedIngredients,
        includedIngredients,
        INGREDIENTS.map((i) => i.name)
          .filter((i) => !excludedIngredients.map((i) => i.name).includes(i))
          .filter((i) => !includedIngredients.map((i) => i.name).includes(i)),
      ),
  })

  const {
    includedIngredients: includedIngredientsMap,
    excludedIngredients: excludedIngredientsMap,
  } =
    ingredientCount && ingredientCount.ingredientFilterCounts
      ? ingredientCount.ingredientFilterCounts.data
      : {}

  const parsedIncludedIngredients = includedIngredientsMap
    ? (JSON.parse(includedIngredientsMap) as {
        [key: string]: number
      })
    : {}

  const parsedExcludedIngredients = excludedIngredientsMap
    ? (JSON.parse(excludedIngredientsMap) as {
        [key: string]: number
      })
    : {}

  const dispatch = useAppDispatch()

  return (
    <div
      className={`absolute right-0 z-50 flex h-full overflow-y-scroll md:h-full ${menuClass} w-full flex-col gap-6 bg-white px-10 py-20 shadow-xl transition-all dark:bg-secondarydark md:w-96`}
    >
      {/* Menu with profile. I assume we are not doing profile? In that case delete name*/}
      <div className='flex gap-2'>
        <img
          className='h-10 cursor-pointer'
          src={x}
          onClick={() => {
            if (open) {
              dispatch(closeFilterMenu())
            }
          }}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <div className='text-start text-xl font-bold'>Include ingredients</div>
        <Select
          options={
            isLoading
              ? []
              : Object.keys(parsedIncludedIngredients).map((key, index) => ({
                  name: key,
                  id: index,
                  count: parsedIncludedIngredients[key],
                }))
          }
          getOptionLabel={(option) =>
            `${option.name} ${
              isLoading
                ? ''
                : '(' + parsedIncludedIngredients[option.name] + ')'
            }`
          }
          getOptionValue={(option) => option.name}
          isLoading={isLoading}
          onChange={(e) => dispatch(includeFilter(e))}
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
              backgroundColor:
                colorMode == 'dark' ? colors.tertiarydark : 'white',
            }),
            option: (provided, state) => ({
              ...provided,
              color: state.isSelected ? 'white' : 'black',
              backgroundColor: state.isSelected
                ? colors.tertiarydark
                : 'transparent',
              '&:hover': {
                backgroundColor: colors.tertiarydark,
                color: 'white',
              },
            }),
          }}
          className='z-999 '
        />

        <div className='flex flex-wrap gap-4'>
          {includedIngredients.map((ingredient) => (
            <IncludingFilterBox
              name={ingredient.name}
              count={parsedIncludedIngredients[ingredient.name] || '0'}
            />
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='text-start text-xl font-bold'>Exclude ingredients</div>
        <Select
          options={
            isLoading
              ? []
              : Object.keys(parsedExcludedIngredients).map((key, index) => ({
                  name: key,
                  id: index,
                  count: parsedExcludedIngredients[key],
                }))
          }
          getOptionLabel={(option) =>
            `${option.name} (${
              isLoading ? '' : parsedExcludedIngredients[option.name]
            })`
          }
          value={null}
          escapeClearsValue
          getOptionValue={(option) => option.name}
          isLoading={isLoading}
          onChange={(e) => dispatch(excludeFilter(e))}
          autoFocus
          placeholder='Search for ingredients'
          defaultValue={null}
          className='z-999'
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 9999,
              backgroundColor: 'black',
            }),
            menuList: (provided) => ({
              ...provided,
              zIndex: 9999,
              backgroundColor:
                colorMode == 'dark' ? colors.tertiarydark : 'white',
            }),
            option: (provided, state) => ({
              ...provided,
              color: state.isSelected ? 'white' : 'black',
              backgroundColor: state.isSelected
                ? colors.tertiarydark
                : 'transparent',
              '&:hover': {
                backgroundColor: colors.tertiarydark,
                color: 'white',
              },
            }),
          }}
        />

        <div className='flex flex-wrap gap-4'>
          {excludedIngredients.map((ingredient) => (
            <ExcludingFilterBox
              name={ingredient.name}
              count={parsedExcludedIngredients[ingredient.name] || '0'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function IncludingFilterBox(props) {
  const { name } = props

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-md border bg-secondary px-2 `}
    >
      <div className='text-sm font-bold '>{name}</div>
    </div>
  )
}

function ExcludingFilterBox(props) {
  const { name } = props
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-md border bg-secondary px-2 `}
    >
      <div className='text-sm font-bold '>{name}</div>
    </div>
  )
}

function FilterBoxAdd() {
  return (
    <div className='flex h-16 w-16 items-center justify-center rounded-md border-4 border-secondary'>
      <img className='h-8' src={add} />
    </div>
  )
}
