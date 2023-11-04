import { ErrorMessage, Field, FieldProps, Formik, FormikErrors } from 'formik'
import { useEffect, useState } from 'react'
import { Link, Form, useNavigate, useParams } from 'react-router-dom'
import RatingDisplay from 'src/components/RatingDisplay'
import useDish from 'src/hooks/useDish'
import { postReview } from 'src/utils/api-calls'

function RatingInput(props: FieldProps<any>) {
  const { field, form } = props
  const { name } = field
  const [ratingInput, setRatingInput] = useState<number>()

  useEffect(() => {
    form.setFieldValue(name, ratingInput)
  }, [ratingInput])

  return (
    <RatingDisplay rating={ratingInput} setRating={setRatingInput} isInput />
  )
}

export default function WriteReview() {
  const navigate = useNavigate()
  const { id } = useParams()
  const dishId = id !== undefined ? parseInt(id, 10) : undefined

  const { refetch: refetchDish } = useDish()

  return (
    <div className='flex h-full w-full flex-col items-center justify-center overflow-y-scroll bg-primary dark:bg-primarydark'>
      <div className='flex w-96 flex-col bg-white p-10 drop-shadow-md dark:bg-secondarydark'>
        <p className='text-xl'>Post a review</p>
        <Formik
          initialValues={{
            title: '',
            comment: '',
            rating: undefined,
          }}
          validate={(values) => {
            const errors: FormikErrors<any> = {}
            if (values.title === '') {
              errors.title = 'Required'
            }
            if (values.comment === '') {
              errors.comment = 'Required'
            }
            if (values.rating === undefined) {
              errors.rating = 'Required'
            }
            return errors
          }}
          onSubmit={async (values, { setSubmitting }) => {
            if (dishId !== undefined && values.rating !== undefined) {
              await postReview(
                dishId,
                values.title,
                values.rating,
                values.comment,
              )
              refetchDish()
              navigate(`/dish/${dishId}`)
            } else {
              console.warn('dishId and rating are required')
            }
            setSubmitting(false)
          }}
        >
          {({ isSubmitting, submitForm }) => (
            <Form className='mt-10 flex flex-col gap-5'>
              <div className='flex flex-col'>
                <label htmlFor='title'>Title</label>
                <Field
                  type='text'
                  name='title'
                  className='border p-2 dark:text-black'
                />
                <ErrorMessage
                  name='title'
                  component='div'
                  className='text-error dark:text-errordark'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='comment'>Comment</label>
                <Field
                  as='textarea'
                  name='comment'
                  className='resize-none border p-2 dark:text-black'
                  rows={5}
                />
                <ErrorMessage
                  name='comment'
                  component='div'
                  className='text-error dark:text-errordark'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='rating'>Rating</label>
                <Field name='rating' component={RatingInput} />
                <ErrorMessage
                  name='rating'
                  component='div'
                  className='text-error dark:text-errordark'
                />
              </div>
              <div className='flex justify-evenly'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='bg-success w-fit rounded-md border p-3'
                  onClick={submitForm}
                >
                  Submit
                </button>
                <Link
                  className='w-fit rounded-md border p-3'
                  to={`/dish/${dishId}`}
                >
                  Cancel
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
