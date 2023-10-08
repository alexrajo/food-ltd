import star from 'src/assets/star.svg';
import halfStar from 'src/assets/half-star.svg';

type RatingDisplayProps = {
  rating: number;
};

export default function RatingDisplay(props: RatingDisplayProps) {
  const { rating: inputRating } = props;
  const rating = Math.max(1, Math.min(5, Math.floor(inputRating * 10 + 0.5) / 10));

  return (
    <div className='flex flex-row gap-3 items-center'>
      <div className='flex flex-row gap-1 items-center'>
        {Array.from(Array(Math.floor(rating + 0.5)).keys()).map((_, index) => (
          <img key={index} src={rating >= index + 1 ? star : halfStar} />
        ))}
      </div>
      <p className='font-semibold'>{rating}</p>
    </div>
  );
}
