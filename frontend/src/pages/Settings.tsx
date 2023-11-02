import React, { useState } from 'react'
import SettingsIcon from 'src/components/icons/SettingsIcon'
import SliderIcon from 'src/components/icons/SliderIcon'
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppRedux'
import { openNavbar } from 'src/redux/modalsReducer'
import { setCelsius, setFahrenheit } from 'src/redux/temperatureUnitReducer'
import { setDark, setLight } from 'src/redux/themeReducer'
import menu from 'src/assets/menu.svg'

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
          onMouseDown={() => {
            dispatch(openNavbar())
          }}
          type='button'
          className='md group flex h-14 w-14 flex-col items-center justify-center gap-2 rounded border-2 border-black bg-white p-1 px-3 dark:border-tertiarydark dark:bg-secondarydark lg:hidden '
        >
          <img
            src={menu}
            alt='menu'
            className='flex h-6 w-6 hover:cursor-pointer '
            onMouseDown={() => {
              dispatch(openNavbar())
            }}
          />
        </button>
        <p className=' flex text-3xl'>Settings</p>

        <div
          className=' mt-8 flex cursor-pointer items-center gap-10 px-10'
          onClick={toggleColorMode}
        >
          <p>Light mode</p>
          <SliderIcon active={colorMode == 'light'} />
        </div>
        <div
          className=' mt-8 flex cursor-pointer items-center gap-10 px-10'
          onClick={toggleFahrenheit}
        >
          <p>Fahrenheit</p>
          <SliderIcon active={unit == 'fahrenheit'} />
        </div>
      </div>
    </div>
  )
}
