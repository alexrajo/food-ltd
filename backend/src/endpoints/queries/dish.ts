import prisma from '../../utils/prisma';

type DishRequestParams = {
  id: number
};

const endpoint = async ({ id }: DishRequestParams) => {
  const dish = await prisma.dishWithReviewAggregate.findUnique({
    where: {
      dishId: id,
    },
  });
  // Change the reviewCount field of the dish to be a number and not a bigint
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const responseDish = !!dish && {
    ...dish,
    reviewCount: Number(dish.reviewCount),
  };
  return {
    data: responseDish,
  };
};

export default endpoint;
