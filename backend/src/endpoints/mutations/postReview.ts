import { type Review } from '@prisma/client';
import prisma from '../../utils/prisma';

const endpoint = async ({ dishId, title, rating, comment }: Omit<Review, 'reviewId'>): Promise<{ data: Review }> => {
  const review = await prisma.review.create({
    data: {
      dishId,
      title,
      rating,
      comment,
      // postedAt is automatically set by the database
    },
  });
  return { data: review };
};

export default endpoint;
