import React, { useState } from 'react'
import cn from 'src/utils/cn'

type ComponentProps = {
  active?: boolean
}
export default function SliderIcon(props: ComponentProps) {
  const { active } = props

  return (
    <div
      className={`relative flex w-12 rounded-full border-2 ${
        active ? ' bg-secondary' : 'bg-primarydark'
      } border-secondarydark p-1 transition-colors `}
    >
      <div
        className={`flex h-4 w-4 rounded-full bg-white  transition-all ${
          active ? ' translate-x-5' : ''
        } `}
      />
    </div>
  )
}
