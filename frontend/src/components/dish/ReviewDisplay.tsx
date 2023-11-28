import type { Review } from 'src/types/types'
import RatingDisplay from '../RatingDisplay'

type ReviewDisplayProps = {
  review: Review
  ref?: React.MutableRefObject<HTMLDivElement>
}
/**
 *
 * @param props Review
 * @returns Component able to display information of the Review type.
 */
export default function ReviewDisplay(props: ReviewDisplayProps) {
  const { review, ref } = props
  const { reviewId, title, rating, comment, postedAt: postedAtUnix } = review

  const postedAt = new Date(parseInt(postedAtUnix, 10)).toUTCString()

  return (
    <div
      key={reviewId}
      className='flex flex-col gap-5 rounded-md border p-5'
      ref={ref}
    >
      <div className='flex flex-col items-center justify-between sm:flex-row'>
        <p className='text-ellipsis text-lg font-semibold sm:w-full'>{title}</p>
        <div className='flex sm:w-full sm:justify-end'>
          <RatingDisplay key={`rating-${reviewId}`} rating={rating} />
        </div>
      </div>
      <p>{comment}</p>
      <p className='opacity-80'>Posted at {postedAt}</p>
    </div>
  )
}
