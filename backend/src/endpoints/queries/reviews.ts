import prisma from '../../utils/prisma';

type ReviewsRequestParams = {
  dishId: number;
  page: number;
  pageSize?: number;
};

const endpoint = async ({ dishId, page, pageSize }: ReviewsRequestParams) => {
  pageSize = pageSize !== undefined ? pageSize : 10;

  const reviews = await prisma.review.findMany({
    where: {
      dishId: dishId,
    },
    skip: Math.max(0, page - 1) * pageSize,
    take: pageSize,
  });
  return { data: reviews };
};

export default endpoint;
