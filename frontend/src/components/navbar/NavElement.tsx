import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

type ComponentProps = {
  icon: React.ReactNode;
  text: string;
  link: string;
};

export default function NavElement(props: ComponentProps) {
  const { icon, text, link } = props;

  const location = useLocation();

  const selected = link == location.pathname;

  return (
    <Link to={link} className=' flex flex-row items-center gap-2 w-72 px-20 relative '>
      {icon}
      <p className={`flex ${selected ? 'light:text-black dark:text-white' : 'text-gray-400'} `}>
        {text}
      </p>
      <div
        className={` absolute h-full w-0.5 bg-tigereye ${selected ? 'flex' : 'hidden'} right-0`}
      />
    </Link>
  );
}
