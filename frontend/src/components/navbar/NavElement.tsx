import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

type ComponentProps = {
  icon: React.ReactNode
  text: string
  link: string
}

export default function NavElement(props: ComponentProps) {
  const { icon, text, link } = props

  const location = useLocation()

  const selected = link == location.pathname

  return (
    <Link
      to={link}
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
