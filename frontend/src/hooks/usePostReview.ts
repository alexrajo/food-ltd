import { useRef, useState } from 'react';
import { Dish } from 'src/types/types';
import { postReview } from 'src/utils/api-calls';
import { usePostReviewReturnType } from './HookTypes';

type HookProps = {
  dishId: Dish['dishId'];
};

/**
 * Hooks which allows to post a review to the backend
 * @example
 * const MyComponent = () => {
 * const { error, isLoading, writeReview, onChangeReviewInput, onChangeRatingInput } = usePostReview();
 * return (
 * <div>
 *    <input type="text" onChange={(event) => onChangeReviewInput(event)} />
 *    <input type="number" onChange={(event) => onChangeRatingInput(event)} />
 *    <button onClick={() => writeReview()}>Submit Review</button>
 * </div>
 */
function useReview(props: HookProps): usePostReviewReturnType {
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

  /**
   * This function posts a review to the backend
   * @returns {void}
   */
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

export default useReview;
