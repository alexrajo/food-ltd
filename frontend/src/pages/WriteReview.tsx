import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import RatingDisplay from 'src/components/RatingDisplay'
import usePostReview from 'src/hooks/usePostReview'

export default function WriteReview() {
  const { id } = useParams()

  const [ratingInput, setRatingInput] = useState<number>(0)

  const { writeReview, onChangeRatingInput, error, onChangeReviewInput } =
    usePostReview(id)

  return (
    <div className='flex h-full w-96 flex-col overflow-y-scroll p-4 md:p-20'>
      <h1>Tittel</h1>
      <input
        type='text'
        name='title'
        id='title'
        className=' dark:bg-secondarydark'
      />
      <h1>Comment</h1>
      <textarea
        className=' dark:bg-secondarydark'
        type='text'
        onChangeText={onChangeReviewInput}
        name='title'
        id='title'
      />
      <h1>Rating</h1>
      {error && <p>{error}</p>}
      <RatingDisplay rating={ratingInput} setRating={setRatingInput} isInput />
      <button onClick={writeReview}>Send</button>
    </div>
  )
}
