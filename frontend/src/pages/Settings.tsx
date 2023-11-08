import SliderIcon from 'src/components/icons/SliderIcon'
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppRedux'
import { openNavbar } from 'src/redux/modalsReducer'
import { setCelsius, setFahrenheit } from 'src/redux/temperatureUnitReducer'
import { setDark, setLight } from 'src/redux/themeReducer'
import MenuIcon from 'src/components/icons/MenuIcon'
import cn from 'src/utils/cn'

/**
 * Page where user can change preferances.
 * Currently only two settings are available.
 */
export default function Settings() {
  const colorMode = useAppSelector((state) => state.theme.value)
  const unit = useAppSelector((state) => state.temperatureUnit.value)
  const dispatch = useAppDispatch()

  const toggleColorMode = () => {
    if (colorMode === 'dark') {
      dispatch(setLight())
    } else {
      dispatch(setDark())
    }
  }

  const toggleFahrenheit = () => {
    if (unit === 'fahrenheit') {
      dispatch(setCelsius())
    } else {
      dispatch(setFahrenheit())
    }
  }

  return (
    <div className='flex w-full'>
      <div className='no-scrollbar flex w-full flex-col gap-2 overflow-y-scroll p-4 md:p-20'>
        <button
          aria-label='Open Navigation Menu'
          onMouseDown={() => {
            dispatch(openNavbar())
          }}
          type='button'
          className='md group flex h-14 w-14 flex-col items-center justify-center gap-2 rounded border-2 border-black bg-white p-1 px-3 dark:border-tertiarydark dark:bg-secondarydark lg:hidden '
        >
          <MenuIcon
            className='flex h-6 w-6 hover:cursor-pointer '
            onMouseDown={() => {
              dispatch(openNavbar())
            }}
          />
        </button>
        <p className=' flex text-3xl'>Settings</p>

        <button
          type='button'
          className=' mt-8 flex items-center gap-10 px-10'
          onClick={toggleColorMode}
        >
          <p className={cn(colorMode === 'dark' ? 'font-bold' : 'font-thin')}>
            Dark mode
          </p>
          <SliderIcon active={colorMode === 'light'} />
          <p className={cn(colorMode === 'light' ? 'font-bold' : 'font-thin')}>Light mode</p>
        </button>
        <button
          type='button'
          className=' mt-8 flex items-center gap-10 px-10'
          onClick={toggleFahrenheit}
        >
          <p
            className={cn(
              unit === 'fahrenheit' ? 'font-semibold' : 'font-thin',
            )}
          >
            Fahrenheit
          </p>
          <SliderIcon active={unit === 'celsius'} />
          <p className={cn(unit === 'celsius' ? 'font-semibold' : 'font-thin')}>
            Celsius
          </p>
        </button>
      </div>
    </div>
  )
}
