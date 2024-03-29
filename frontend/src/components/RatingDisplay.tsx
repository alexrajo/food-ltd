import star from 'src/assets/star.svg'
import halfStar from 'src/assets/half-star.svg'
import outlineStar from 'src/assets/outline-star.svg'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import cn from 'src/utils/cn'

type RatingDisplayProps = {
  rating?: number | null
  isInput?: boolean
  setRating?: Dispatch<SetStateAction<number | undefined>> | null
  textStyle?: string
  reviewCount?: number
  className?: string
}

/**
 * A component that displays a rating as a sequence of stars (1-5). Clamps rating to 1-5 and rounds to one decimal.
 * @param props rating: the rating to display
 * @returns The component that displays the rating
 */
export default function RatingDisplay(props: RatingDisplayProps) {
  const {
    rating: inputRating,
    isInput,
    setRating: setRatingProp,
    textStyle,
    reviewCount,
    className,
  } = props

  const receivedRating =
    inputRating === undefined ||
    inputRating === null ||
    Number.isNaN(inputRating)
      ? 0
      : Math.max(1, Math.min(5, Math.floor(inputRating! * 10 + 0.5) / 10))

  const [rating, setRating] = useState(receivedRating)

  useEffect(() => {
    setRating(receivedRating)
  }, [receivedRating])

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <div className='flex flex-row items-center'>
        {Array.from(Array(5).keys()).map((number, index) => {
          const isGrayed = Math.ceil(rating - 0.3) < index + 1
          const isHalf = rating - index > 0.3 && rating - index < 0.7
          if (!isInput) {
            return (
              <div key={number} className='pl-0.5 pr-0.5 first:pl-0 last:pr-0'>
                <img
                  alt={`star rating, number ${index + 1}`}
                  src={
                    (!isGrayed && isHalf && halfStar) ||
                    (isGrayed && outlineStar) ||
                    star
                  }
                  className={cn(isInput && 'cursor-pointer', 'drop-shadow-md')}
                  data-testid='star'
                />
              </div>
            )
          }
          return (
            <button
              key={number}
              type='button'
              onMouseEnter={() => setRating(index + 1)}
              onMouseLeave={() => setRating(receivedRating)}
              onClick={() => setRatingProp?.(index + 1)}
              className='pl-0.5 pr-0.5 first:pl-0 last:pr-0 hover:scale-110'
            >
              <img
                alt={`star number ${index + 1}`}
                src={
                  (!isGrayed && isHalf && halfStar) ||
                  (isGrayed && outlineStar) ||
                  star
                }
                className={cn(isInput && 'cursor-pointer', 'drop-shadow-md')}
              />
            </button>
          )
        })}
      </div>
      <p className={cn('font-semibold', textStyle)}>
        {`${rating > 0 ? rating : 'No rating'}${
          reviewCount !== undefined ? ` (${reviewCount})` : ''
        }`}
      </p>
    </div>
  )
}
