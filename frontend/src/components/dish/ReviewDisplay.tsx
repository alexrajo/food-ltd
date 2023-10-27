import type { Review } from 'src/types/types'
import RatingDisplay from '../RatingDisplay'

type ReviewDisplayProps = {
  review: Review
}
/**
 * Displays the content of an individual user rating. Used on each dish page. 
 */
export default function ReviewDisplay(props: ReviewDisplayProps) {
  const { review } = props
  const { reviewId, title, rating, comment, postedAt: postedAtUnix } = review

  const postedAt = new Date(parseInt(postedAtUnix)).toUTCString()

  return (
    <div key={reviewId} className='flex flex-col gap-5 rounded-md border p-5'>
      <div className='flex flex-col items-center justify-between sm:flex-row'>
        <p className='text-ellipsis font-semibold sm:w-full'>{title}</p>
        <div className='flex sm:w-full sm:justify-end'>
          <RatingDisplay key={`rating-${reviewId}`} rating={rating} />
        </div>
      </div>
      <p>{comment}</p>
      <p className='text-grayed-text'>Posted at {postedAt}</p>
    </div>
  )
}