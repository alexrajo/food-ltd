export const SORTING_OPTIONS = {
  alphabetical: {
    title: 'asc',
  },
  popular: [
    {
      reviewCount: 'desc',
    },
    {
      dishId: 'asc',
    },
  ],
  rating: [
    {
      averageRating: { sort: 'desc', nulls: 'last' },
    },
    {
      dishId: 'asc',
    },
  ],
};
