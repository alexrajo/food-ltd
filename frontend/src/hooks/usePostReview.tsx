import { useRef, useState } from 'react';
import { Dish } from 'src/types/types';
import { postReview } from 'src/utils/api-calls';

type HookProps = {
  dishId: Dish['dishId'];
};
export default function useReview(props: HookProps) {
  const { dishId } = props;
  /** User inputs */
  const userTitle = useRef<string>('');
  const userText = useRef<string>('');
  const userRating = useRef<number>(0);

  /** Error message */
  const [error, setError] = useState<string>('');
  /** Loading state */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeReviewInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    /** Destruct */
    const { value } = event.target;
    /** Update the state */
    userText.current = value;
  };

  const onChangeRatingInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    /** Destruct */
    const { value } = event.target;
    if (parseInt(value, 10) < 0 || parseInt(value, 10) > 5) {
      return;
    }
    /** Update the state */
    userRating.current = parseInt(value, 10);
  };

  const writeReview = async () => {
    if (userText.current === '' || userRating.current === 0) {
      setError('Please fill in all the fields');
      return;
    }
    setIsLoading(true);
    postReview(dishId, userTitle.current, userRating.current, userText.current)
      .then(() => {
        userText.current = '';
        userRating.current = 0;
        setError('');
      })
      .catch(setError)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    error,
    isLoading,
    writeReview,
    onChangeReviewInput,
    onChangeRatingInput,
  };
}
