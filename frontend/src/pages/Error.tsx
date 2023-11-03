import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-4'>
      <div className='flex w-fit flex-col gap-4'>
        <div className='text-3xl font-bold'>This page does not exist.</div>
        <div className='w-full text-center'>
          Or some other error has occured.
        </div>
        <div className='w-full border'></div>
      </div>
      <div>
        You can go to{' '}
        <Link className='font-bold' to='/'>
          Home
        </Link>{' '}
        or{' '}
        <Link className='font-bold' to='/settings'>
          Settings
        </Link>{' '}
        for example.
      </div>
    </div>
  )
}
