import star from 'src/assets/star.svg'
import halfStar from 'src/assets/half-star.svg'
import outlineStar from 'src/assets/outline-star.svg'

type RatingDisplayProps = {
  rating?: number | null
  textStyle?: string
  reviewCount?: number
}

/**
 * A component that displays a rating as a sequence of stars (1-5). Clamps rating to 1-5 and rounds to one decimal.
 * @param props rating: the rating to display
 * @returns The component that displays the rating
 */
export default function RatingDisplay(props: RatingDisplayProps) {
  const { rating: inputRating, textStyle } = props
  const rating =
    inputRating === undefined ||
    inputRating === null ||
    Number.isNaN(inputRating)
      ? 0
      : Math.max(1, Math.min(5, Math.floor(inputRating * 10 + 0.5) / 10))

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <div className='flex flex-row items-center gap-1'>
        {Array.from(Array(5).keys()).map((number, index) => {
          const isGrayed = Math.ceil(rating - 0.3) < index + 1
          const isHalf = rating - index > 0.3 && rating - index < 0.7
          return (
            <img
              alt='star'
              key={number}
              src={
                (isGrayed && isHalf && halfStar) ||
                (isGrayed && outlineStar) ||
                star
              }
            />
          )
        })}
      </div>
      <p className={`font-semibold ${textStyle}`}>
        {`${rating > 0 ? rating : 'No rating'}${
          props.reviewCount !== undefined ? ` (${props.reviewCount})` : ''
        }`}
      </p>
    </div>
  )
}
