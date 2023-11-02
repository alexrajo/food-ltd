import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/useAppRedux'
import { closeFilterMenu, closeNavbar } from 'src/redux/modalsReducer'

type ComponentProps = {
  icon: React.ReactNode
  text: string
  link: string
}

export default function NavElement(props: ComponentProps) {
  const { icon, text, link } = props

  const location = useLocation()

  const selected = link == location.pathname

  const dispatch = useAppDispatch()
  return (
    <Link
      to={link}
      onClick={() => {
        dispatch(closeNavbar())
        dispatch(closeFilterMenu())
      }}
      className=' relative flex w-72 flex-row items-center gap-2 px-20 '
    >
      {icon}
      <p
        className={`flex ${
          selected ? 'text-black dark:text-white' : 'text-gray-400'
        } `}
      >
        {text}
      </p>
      <div
        className={` absolute h-full w-0.5 bg-secondary ${
          selected ? 'flex' : 'hidden'
        } right-0`}
      />
    </Link>
  )
}
